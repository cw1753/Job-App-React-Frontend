import React, {Component} from 'react';

export default class addJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: null,
            jobTitle: null,
            status: "Pending",
            note: null,
            link: null,
            applyDate: new Date().toLocaleDateString()
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/add-job", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error(res.error);
            }
            return res.json();
        }).then( (data) => {
            console.log(data); // Check
        }).catch( (err) => {
            console.log("Error: ", err);
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="col s9 offset-s1" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="company">Company Name</label>
                                <input className="validate" type="text" id="company" required onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="jobTitle">Job Title</label>
                                <input type="text" id="jobTitle" required onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s3">
                                <label htmlFor="status">Status: </label>
                                <select className="browser-default" id="status" onChange={this.handleChange}>
                                    <option value="Pending">Pending</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="In Interview Process">In Interview Process</option>
                                    <option value="Declined">Declined</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="note">Note</label>
                                <textarea className="materialize-textarea" type="text" id="note" onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="link">Application Link</label>
                                <input type="url" id="link" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="center-align">
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}