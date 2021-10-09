import { useHistory } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import PieChart from './PieChart';
import QALeadCard from './QALeadCard';
import logo from './logo.png';
import Coins from './Coins'
import Map from './Map'
import axios from 'axios';

const Dashboard = () => {

    
    let history = useHistory()

    //if the user is not null get loggedin user data to customize dashboard
    //if the user is null they will not be able to access dashboard
    const [loggedInUser, setLoggedInUser] = useState(null)

    //GET logged in user
    useEffect(()=>{
        axios.get('http://localhost:8000/api/loggedin', {withCredentials:true})
            .then(res=>{
                console.log("****Logged in user-->", res)
                setLoggedInUser(res.data.user)
            })
            .catch(err=>{
                console.log("error***", err)
                history.push('/')
            })
    }, [])

    //GET the logged out user 
    const logout = (e)=>{
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(res=>{
                console.log(res)
                history.push('/')
            })
            .catch(err=>{
                console.log(err)
            })
    }


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <a href="/dashboard"><img src={ logo } className="align-top" style={{ width:"26px"}} alt ="logo"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav ms-auto">
                                <a href="/questionboard" className="nav-link nav-text align-bottom">QABoard</a>
                                <a href="#go-to-infographics" className="nav-link nav-text align-bottom">Infographics</a>
                                <a href="/" className="nav-link nav-text align-bottom">Articles</a>
                                <a href="/" className="nav-link nav-text align-bottom" onClick={ logout }>Logout</a>
                        </div>
                    </div>
            </div>
        </nav>
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="row justify-content-center">    
                    {loggedInUser?
                        <h2 id="dashboard-header" className="my-3 text-center">Welcome {loggedInUser.firstName} to your dashboard.</h2>
                        : ""
                    }
                    </div>
                    <div className="row justify-content-center ml-5">
                        <Map></Map>
                        <p className="map-title mt-3">Invest in Projects Changing the World</p>
                            <div className="col-9 mb-5">
                                <p className="map-list">1. Reforestation on the Blockchain. Look for Veritree reforestation projects on the map or visit their website: <a href="https://ito.veritree.com/" className ="external-link">Veritree</a></p>
                                <p className="map-list">2. Gooddollar, a project providing Universal Basic Income for global citizens. Look for Gooddollar on the map or visit their website: <a href="https://ito.veritree.com/" className ="external-link">Gooddollar</a></p>
                            </div>
                    </div>
                    <hr></hr>
                    <h6 className="section-titles mt-5" id="go-to-infographics">Infographics</h6>
                    <div className="row justify-content-center">
                        <PieChart></PieChart>   
                    </div>
                    <hr></hr>
                </div>
                <div className="col">
                <h6 className="section-titles" id="coin-stat-title">Your Favorite Assets</h6>
                    <div className="row justify-content-center mb-5">
                        <Coins></Coins>
                    </div>
                    <hr className="mb-5"></hr>
                    <h6 className="section-titles mb-5">Question and Answer</h6>
                    <div className="row justify-content-center">
                        <QALeadCard></QALeadCard>       
                    </div>
                </div>
            </div>
        </div>

        </>
    );
};

export default Dashboard;



