import React, { Component } from 'react';

export default class ComapnyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: props.match.params.company,
            link: null,
            jobs: [],
            wantToChangeLink: false,
            newLink: null
        }
    }

    componentDidMount() {
        fetch('/api/company/'+ this.state.company, {
            method: 'GET',
            mode: 'no-cors'
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then( (data) => {
            //console.log(data[0].link); //Check
            this.setState({link: data[0].link});
        }).catch(err => {
            console.log("Error: ", err);
        })

        fetch('/api/job/'+ this.state.company, {
            method: 'GET',
            mode: 'no-cors'
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error('Bad response from server');
            }
            return res.json();
        }).then( (data) => {
            //console.log(data);
            this.setState({jobs: data});
        }).catch(err => {
            console.log("Error: ", err);
        })

    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleChangeLink = () => {
        this.setState({wantToChangeLink: !this.wantToChangeLink})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let dataToSend = {
            company: this.state.company,
            link: this.state.newLink
        }

        fetch("/api/edit-company-link", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then( (data) => {
            //console.log(data); // Check
            this.setState({
                link: this.state.newLink,
                newLink: null,
                wantToChangeLink: false
            })
        }).catch( (err) => {
            console.log("Error: ", err);
        })
    }
    
    render() {
        const jobList = this.state.jobs.map( (job) => {
            return(
                <tr key={job._id}>
                    <td>{job.jobTitle}</td>
                    <td>{job.applyDate.substring(0,10)}</td>
                    <td>{job.status}</td>
                    <td>{job.note}</td>
                </tr>
            )
        })
        
        return(
            <div className="container">
                <h1>{this.state.company}</h1>
                {this.state.link ? (
                    <h6>
                        <a target="_blank" rel="noopener noreferrer" href={this.state.link}>Link to Application</a>
                    </h6>
                ) : (
                    <h6>
                        No application link available
                    </h6>
                )}
                
                {this.state.wantToChangeLink ? (
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <label htmlFor="newLink">Enter New Link</label>
                            <input id="newLink" type='url' pattern="https://.*" onChange={this.handleChange} />
                            <button>Submit</button>
                        </div>
                    </form>
                ) : (
                    <button onClick={this.handleChangeLink}>Edit Link</button>
                )}
                
                <div className="card blue lighten-5">
                    <table className="highlight">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Apply Date</th>
                                <th>Status</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}