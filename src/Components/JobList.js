import React, {Component} from 'react';
import EditModal from './EditModal';
import { Link } from 'react-router-dom';
import {checkJwtTimeOut} from '../Helpers/jwt';


export default class Job extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobs: [],

            editIndex: "",

            modalIsOpen: false,
            editId: "",
            editCompany: "",
            editJobTitle: "",
            editStatus: "",
            editNote: ""
        }
    }

    componentDidMount() {
        checkJwtTimeOut();
        fetch('/api/job', {
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('JWT_TOKEN')}
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error('Bad response from server');
            }
            return res.json();
        }).then( (data) => {
            //console.log(data); //Check
            this.setState({jobs: data});
        }).catch(err => {
            console.log("Error: ", err);
        })
    }

    openModal = (job, i) => {
        this.setState({
            modalIsOpen: true,
            editIndex: i,
            editId: job._id,
            editCompany: job.company,
            editJobTitle: job.jobTitle,
            editStatus: job.status,
            editNote: job.note
        });
    }

    closeModal = (job) => {
        if(job === "Deleted"){
            let updatedJobList = [...this.state.jobs];
            updatedJobList.splice(this.state.editIndex,1);
            this.setState({
                jobs:updatedJobList
            });
        }
        else if(job !== ""){
            let updatedJobList = [...this.state.jobs];
            updatedJobList[this.state.editIndex] = job;
            this.setState({
                jobs: updatedJobList
            });
        }

        this.setState({
            editIndex: "",

            modalIsOpen: false,
            editId: "",
            editCompany: "",
            editJobTitle: "",
            editStatus: "",
            editNote: ""
        });
    }

    render() {
        const jobList = this.state.jobs.map( (job, index) => {
            return(
                <tr key={job._id}>
                    <td><Link to={"/company-info/"+job.company}>{job.company}</Link></td>
                    <td>{job.jobTitle}</td>
                    <td>{job.applyDate.substring(0,10)}</td>{/*Using substring to show formated date*/}
                    <td>{job.status}</td>
                    <td>{job.note}</td>
                    <td>
                        <button className="btn-small" onClick={ () => this.openModal(job, index)}>
                            <i className="material-icons right">edit</i>Edit/Remove
                        </button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="row">
                <table className="col s10 offset-s1 highlight responsive-table">
                    <col width="80"/>
                    <col width="150"/>
                    <col width="150"/>
                    <col width="80"/>
                    <col width="1000"/>
                    <col width="198"/>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Job Title</th>
                            <th>Apply Date</th>
                            <th>Status</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobList}
                    </tbody>
                </table>
                <EditModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal}
                    id= {this.state.editId}
                    company= {this.state.editCompany}
                    jobTitle= {this.state.editJobTitle}
                    status= {this.state.editStatus}
                    note= {this.state.editNote}
                />

            </div>
        )
    }
}
