import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {checkJwtTimeOut} from '../Helpers/jwt';

export default class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            search: ""
        }
    }

    componentDidMount() {
        checkJwtTimeOut(this.props);
        fetch(process.env.REACT_APP_API_URL + '/api/company', {
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('JWT_TOKEN')}
        }).then( (res) => {
            if(res.status >= 400) {
                throw new Error('Bad response from server');
            }
            return res.json();
        }).then( (data) => {
            //console.log(data); //Check
            this.setState({companies: data});
        }).catch(err => {
            console.log("Error: ", err);
        })
    }

    handleUpdateSearch = (e) =>{
        this.setState({[e.target.id]: e.target.value});
    }

    render() {
        //For search bar
        let filteredCompanies = this.state.companies.filter( (company) => {
            return(
                company.company.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            )
        })
        const companyList = filteredCompanies.map( (company) => {
            return(
                <div key={company._id}>
                    <li className="left-align"><Link to={"/company-info/"+company.company}>{company.company}</Link></li>
                </div>
            )
        })
        return(
            <div className="container center">
                <div className="row">
                    <p></p>
                    <div className="col s5 offset-s1">
                        <h4>Companies Applied:</h4>
                    </div>
                    <div className="col s3">
                        <div className="input-field">
                            <label htmlFor="search">Search</label>
                            <input id="search" type="text" onChange={this.handleUpdateSearch} />
                        </div>
                    </div>
                </div>
                <ul>
                    <div className="row">
                        <div className="col s5 offset-s6">
                            <font size='5'>
                                {companyList}
                            </font>
                        </div>
                    </div>
                </ul>
                </div>
        )
    }
}