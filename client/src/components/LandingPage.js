import React from 'react';
import finfluence from './finfluence.png';
import { Link } from "react-router-dom";


const LandingPage = () => {

    return (
    
    <div className="container">
        <div className="row">
            <ul className="list-inline mt-5">
                <li className="list-inline-item description-landing">
                    <img src={ finfluence } id="logo" style={{ width:"250px"}} alt ="finfluence logo" />
                </li>
            </ul>
            <hr></hr>
            <h2 className="" id="hero-header">Digital Asset Analytics for Meaningful Impact.</h2>
            <hr></hr>
        </div>
        <div className="row">
            <div className="col-md offset-md-8">
            <Link 
                to={`/registration`}
                className = "btn shadow mb-3 enter-btn registration-btn"
                >Registration
            </Link>
            </div>
        </div>
        <div className="row">
        <div className="col-md offset-md-8">
            <Link 
                to={`/login`}
                className = "btn shadow mb-3 enter-btn login-btn"
                >Login
            </Link>
        </div>
        </div>
    </div>
    );
};

export default LandingPage;