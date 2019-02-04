import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {checkJwtTimeOut} from '../Helpers/jwt';

ReactModal.setAppElement('#root');

export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            company: "",
            jobTitle: "",
            status: "",
            note: ""
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.id,
            company: props.company,
            jobTitle: props.jobTitle,
            status: props.status,
            note: props.note
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleEdit = (e) => {
        e.preventDefault();
        checkJwtTimeOut(this.props);
        fetch(process.env.REACT_APP_API_URL + '/api/edit-job', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('JWT_TOKEN')},
            body: JSON.stringify(this.state)
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then( (data) => {
            //console.log(data); // Check
            this.props.closeModal(data);
        }).catch( (err) => {
            console.log("Error: ", err);
        })
    }

    handleDelete = () => {
        checkJwtTimeOut(this.props);
        fetch(process.env.REACT_APP_API_URL + '/api/delete-job', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('JWT_TOKEN')},
            body: JSON.stringify(this.state)
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        }).then( (data) => {
            // console.log(data); // Check
            this.props.closeModal("Deleted");
        }).catch( (err) => {
            console.log("Error: ", err);
        })
    }

    render() {
        return(
            <div className="container">
                <ReactModal
                    isOpen= {this.props.modalIsOpen}
                    onRequestClose= {() => this.props.closeModal("")}
                >
                    <button className="btn-flat right" onClick={() => this.props.closeModal("")}>
                        <i className="material-icons">close</i>
                    </button>
                    <div className="row"> 
                        <h1>{this.state.company}</h1>
                        <h4>{this.state.jobTitle}</h4>
                    </div>
                    <div className="row">
                        <div className="col s3">
                            <label id="status">Status:</label>
                            <select className="browser-default" id="status" onChange={this.handleChange}>
                                <option value={this.state.status}>{this.state.status}</option>
                                <option value="Pending">Pending</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                                <option value="In Interview Process">In Interview Process</option>
                                <option value="Declined">Declined</option>
                            </select>
                        </div>
                    </div>
                    <label id="note">Note: </label>
                    <p><textarea id="note" value={this.state.note} onChange={this.handleChange}></textarea></p>
                    <button className="btn-large center-align" type="button" onClick={this.handleEdit}>
                        <i className="material-icons right">send</i>Save Changes
                    </button>
                    <button className="btn red right" type="button" onClick={this.handleDelete}>
                        Delete
                    </button>
                
                </ReactModal>
            </div>
        )
    }
}