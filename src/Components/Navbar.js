import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return(
        <div>
            <nav className='nav-wrapper blue'>
                <div className="container">
                    <Link to='/' className="brand-logo">Job Application Web App</Link>
                    <ul className="right">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/job-List">Job List</Link></li>
                        <li><Link to="/add-Job">Add Job</Link></li>
                        <li><Link to="/company-List">Companies</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;