import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo.png';


const Registration = () => {

    let history = useHistory()

    let [registrationInfo, setRegistrationInfo] = useState({
        firstName: "",
        lastName: "",
        description:"",
        email:"",
        loginPw:"",
        confirmPw:"",  
    })

    let [validationErrors, setValidationErrors] = useState({})


    const changeHandlerRegistration = (e) =>{
        console.log("***adding registration inputs...")
        setRegistrationInfo({
            ...registrationInfo,
            [e.target.name]:e.target.value
        })
    }

    const submitHandlerRegistration = (e)=>{
        e.preventDefault();
        console.log("1-inside submit handler")
        axios.post("http://localhost:8000/api/registration", registrationInfo, { withCredentials:true })
            .then(res=>{
                console.log("2***submit button clicked-->", res)
                if(res.data.errors){
                    console.log("3-ERRORS****")
                    setValidationErrors(res.data.errors)
                    }
                    else {
                        history.push('/dashboard')
                        console.log("wahoo!-Registration was Successful!")
                    }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <>
            <div>
                <a href="/"><img src={ logo } className="mx-3 mt-3" style={{ width:"35px"}} alt ="logo" /></a>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <div className="card token-card reg-log-card shadow">
                    <div className="card-header">Registration</div>
                        <div className="card-body">
                            <form onSubmit= { submitHandlerRegistration } autocomplete="off">
                            
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="inputFirstName" 
                                    >First Name
                                    </label>
                                    <input 
                                    type="text"
                                    name="firstName"
                                    id="inputFirstName"  
                                    className="form-control form-input-field" 
                                    onChange={ changeHandlerRegistration }
                                    />
                                    {
                                    validationErrors.firstName? <p className="form-text">{ validationErrors.firstName.message }</p>: ""
                                    }
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="inputLastName" 
                                    >Last Name
                                    </label>
                                    <input 
                                    type="text" 
                                    name="lastName"
                                    id="inputLastName" 
                                    className="form-control form-input-field" 
                                    onChange={ changeHandlerRegistration }
                                    />
                                    {
                                    validationErrors.lastName? <p className="form-text">{validationErrors.lastName.message} </p>: ""
                                    }
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label 
                                    className="form-label" htmlFor="inputDescription" 
                                    >Pronouns, Profession
                                    </label>
                                    <input
                                    type="text" 
                                    name="description"
                                    id="inputDescription" 
                                    className="form-control form-input-field" 
                                    onChange={ changeHandlerRegistration }
                                    />
                                    {
                                    validationErrors.description? <p className="form-text">{validationErrors.description.message}</p>: ""
                                    }
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="inputEmail" 
                                    >Email</label>
                                    <input
                                    type="email"
                                    name="email"
                                    id="inputEmail" 
                                    className="form-control form-input-field" 
                                    onChange={ changeHandlerRegistration }
                                    />
                                    {
                                    validationErrors.email?  <p className="form-text">{validationErrors.email.message}</p>: ""
                                    }
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="inputLoginPw" 
                                    >New Password</label> 
                                    <input 
                                    type="password"
                                    name="loginPw"
                                    id="inputLoginPw"
                                    className="form-control form-input-field" 
                                    onChange={ changeHandlerRegistration }
                                    />
                                    {
                                    validationErrors.loginPw? <p className="form-text">{validationErrors.loginPw.message}</p>: ""
                                    }
                                </div>

                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="inputConfirmPw" 
                                    >Confirm New Password</label> 
                                    <input
                                    type="password"  
                                    name="confirmPw"
                                    id="inputConfirmPw" 
                                    className="form-control form-input-field" 
                                    onChange={ changeHandlerRegistration }
                                    />
                                    {
                                    validationErrors.confirmPw? <p className="form-text">{validationErrors.confirmPw.message}</p>: ""
                                    }
                                </div>
                                
                                <div className="form-group justify-content-center mb-3">
                                    <button 
                                    type="submit" 
                                    className="btn shadow reg-login-btn"
                                    >Register</button>
                                </div>

                            </form>
                    </div>
                </div>
            </div>
    </>
    );
};


export default Registration;
