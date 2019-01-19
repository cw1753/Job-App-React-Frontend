import React, { Component } from 'react';
import JobList from './Components/JobList';
import AddJob from './Components/AddJob';
import Home from './Components/Home';
import CompanyList from './Components/CompanyList';
import CompanyInfo from './Components/CompanyInfo';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route } from  'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="Application">
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/job-List' component={JobList} />
          <Route path='/add-Job' component={AddJob} />
          <Route path="/company-List" component={CompanyList} />
          <Route path='/company-info/:company' component={CompanyInfo} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
