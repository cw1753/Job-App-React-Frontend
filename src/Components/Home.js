import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            numJobs: null,
            numCompanies: null,
            numPending: null,
            numRejected: null,
            numInInterview: null,
            numApplyToday: null
        }
    }

    componentDidMount() {
        fetch('/api/job', {
            method: 'GET',
            mode: 'no-cors'
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error('Bad response from server');
            }
            return res.json();
        }).then( (data) => {
            //console.log(data); //Check
            this.setState({jobs: data});
            this.setUpInformation();
        }).catch(err => {
            console.log("Error: ", err);
        })
    }

    checkTodayDate = (applyDay) => {
        let today = new Date();
        return(
            Boolean(parseInt(applyDay.substring(0,4)) === today.getFullYear() &&
                parseInt(applyDay.substring(5,7)) === today.getMonth()+1 &&
                parseInt(applyDay.substring(8,10)) === today.getDate()
            )
        )
    }

    setUpInformation = () => {
        let countJob = this.state.jobs.length;
        let countCompany = [...new Set(this.state.jobs.map(x => x.company))].length;
        let countPending = 0;
        let countRejected = 0;
        let countInInterview = 0;
        let countApplyToday = 0;
        this.state.jobs.forEach( (job) => {
            if(job.status === "Pending"){ countPending++; }
            if(job.status === "Rejected"){ countRejected++; }
            if(job.status === "In Interview Process"){ countInInterview++; }
            if(this.checkTodayDate(job.applyDate)){ countApplyToday++; }
        })

        this.setState({
            numJobs: countJob,
            numCompanies: countCompany,
            numPending: countPending,
            numRejected: countRejected,
            numInInterview: countInInterview,
            numApplyToday: countApplyToday
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="center-align">
                        <h3>Number of Applications Sent Today: {this.state.numApplyToday}</h3>
                        <h3>Number of Applications: {this.state.numJobs}</h3>
                        <h3>Number of Companies: {this.state.numCompanies}</h3>
                        <h3>Number of Interview in Progress: {this.state.numInInterview}</h3>
                        <h3>Number of Pending Applications: {this.state.numPending}</h3>
                        <h3>Number of Rejections: {this.state.numRejected}</h3>
                    </div>
                </div>
            </div>
        )
    }
}