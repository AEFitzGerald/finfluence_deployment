import { useHistory } from 'react-router-dom'
import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';



const Login = () => {

    const history = useHistory();  
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        loginPw:""
    })

    const [errorMsg, setErrorMsg] = useState(null)

    const changeHandlerLogin = (e) =>{
        console.log("***adding login inputs...")
        setLoginInfo({
            ...loginInfo,
            [e.target.name]:e.target.value
        })
    }

    const submitHandlerLogin = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", loginInfo, {withCredentials:true} )
            .then(res=>{
                console.log("***submit button clicked-->", res)
                if(res.data.msg==="success!"){
                    history.push('/dashboard')
                    console.log("Wahoo! Login was Successful!")
                }else{
                    setErrorMsg(res.data.msg)
                }
            })
            .catch(err=>console.log(err))
    }

    return (
        <>
        <div>
            <a href="/"><img src={ logo } className="mx-3 mt-3" style={{ width:"35px"}} alt ="logo" /></a>
        </div>
        <div className="d-flex justify-content-center mt-5">
            <div className="card token-card reg-log-card shadow">
                <div className="card-header">Login</div>
                    <div className="card-body">
                        <form onSubmit= { submitHandlerLogin } autocomplete="off">
                        {
                        errorMsg? <p className="form-text">{ errorMsg }</p>:""
                        }
                
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="inputEmail" 
                            >Email</label>
                            <input
                            type="email"
                            name="email"
                            id="inputEmail" 
                            className="form-control form-input-field" 
                            onChange={ changeHandlerLogin }
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="inputLoginPw" 
                            >Password</label> 
                            <input 
                            type="password"
                            name="loginPw"
                            id="inputLoginPw"
                            className="form-control form-input-field" 
                            onChange={ changeHandlerLogin }
                            />
                        </div>

                        <div className="mb-3">
                            <button 
                            type="submit" 
                            className="btn shadow reg-login-btn"
                            >Login</button>
                        </div>
                    </form>  
                </div>
            </div>
        </div>
    </>
    );
};


export default Login;
