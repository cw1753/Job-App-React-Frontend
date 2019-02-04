import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {Link} from 'react-router-dom';
import {checkJwtTimeOut} from '../Helpers/jwt';

export default class addJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "",
            jobTitle: "",
            status: "Pending",
            note: "",
            link: "",
            applyDate: new Date().toLocaleDateString(),

            modalIsOpen: false
        }
        checkJwtTimeOut(this.props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        checkJwtTimeOut(this.props);
        fetch(process.env.REACT_APP_API_URL + '/api/add-job', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('JWT_TOKEN')},
            body: JSON.stringify(this.state)
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error(res.error);
            }
            return res.json();
        }).then( (data) => {
            this.setState({
                modalIsOpen: true
            })
            // console.log(data); // Check
        }).catch( (err) => {
            console.log("Error: ", err);
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    closeModal = () => {
        this.setState({
            company: "",
            jobTitle: "",
            status: "Pending",
            note: "",
            link: "",

            modalIsOpen: false
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="col s9 offset-s1" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="company">Company Name</label>
                                <input className="validate" type="text" id="company" required onChange={this.handleChange} value={this.state.company}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="jobTitle">Job Title</label>
                                <input type="text" id="jobTitle" required onChange={this.handleChange} value={this.state.jobTitle}/>
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
                                <textarea className="materialize-textarea" type="text" id="note" onChange={this.handleChange} value={this.state.note}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="link">Application Link</label>
                                <input type="url" id="link" onChange={this.handleChange} value={this.state.link}/>
                            </div>
                        </div>
                        <div className="center-align">
                            <button className="waves-light btn">
                                <i className="material-icons right">send</i>Submit
                            </button>
                        </div>
                    </form>
                </div>

                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <div className="container">
                        <div className="center">
                            <h2>{this.state.company}</h2>
                            <h4>{this.state.jobTitle}</h4>
                            <div className="row">
                                <h6>This job has been added</h6>
                            </div>
                            <div className="row">
                                <div className="col s5">
                                    <Link to="/job-List">
                                        <button className="waves-effect waves-light btn">
                                            <i className="material-icons left">view_list</i>Back to Job List
                                        </button>
                                    </Link>
                                </div>
                                <div className="col s7">
                                        <button className="waves-effect waves-light btn red accent-2" onClick={this.closeModal}>
                                            <i className="material-icons left">add_box</i>Add Another Job
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

// Style for the ReactModal
const customStyles = {
    content : {
      top                   : '40%',
      left                  : '50%',
      transform             : 'translate(-50%, -50%)'
    }
  };