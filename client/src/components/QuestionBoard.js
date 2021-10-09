import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import logo from './logo.png'
import axios from 'axios'


const QuestionBoard = () => {

    const history = useHistory() 

    const [questions, setQuestions] = useState([])

    const [ newQuestion, setNewQuestion ] = useState( {

        question:"", 

    } )

    const [ validationErrors, setValidationErrors] = useState( {

        question:"",

    } )


    useEffect(()=>{

        axios.get('http://localhost:8000/api/questions')
            .then(res=> {
                console.log("***********Get all res-->", res)
                setQuestions( res.data ) 
            })
            .catch(err => console.log( err ) )
            
    },[]);


    const changeHandler = e =>{

        const { name, value } = e.target;

            setNewQuestion({ 
                ...newQuestion,
                [name]:value,
            } )

    }


    const submitHandler = e => {
        e.preventDefault()

        console.log("the question was submitted -->", newQuestion)

        axios
            .post("http://localhost:8000/api/question", newQuestion)
            .then( res => {
                console.log("this is the response-->", res)
                if (res.data.err)
                    setValidationErrors(res.data.err.errors)
                else 
                    setQuestions([...questions, newQuestion])
                    setNewQuestion({
                        question:"",
                    })
                    history.push("/questionboard") 
            })
    }


    return (
        <>      
        <div>
            <a href="/dashboard"><img src={ logo } className="mx-3 my-3" style={{ width:"35px"}} alt ="logo" /></a>
        </div>
        <div className="map-sidebar" id="question-bar">
            <form 
                className="row g-3 align-items-center justify-content-center"
                autocomplete="off" 
                onSubmit={ submitHandler }
            >
                <div className="col-auto">
                    <label 
                    htmlFor="question" 
                    className="col-form-label"
                    >Post Question to the Question Board:
                    </label>
                </div>
                <div className="col-auto">
                    <input 
                        type="text" 
                        id="question" 
                        name="question"
                        className="form-control form-input-field" 
                        value= { newQuestion.question }
                        onChange = { changeHandler }
                    />
                </div>
                <div className="col-auto">
                    <p>
                    <span id="questionHelpInline" className="form-text"> 
                        {
                        validationErrors.question? validationErrors.question.message: ""
                        }
                    </span>
                    </p>
                </div>
                <div className="col-auto">
                    <button 
                        type="submit"
                        className="btn shadow reg-login-btn" 
                        >Submit
                    </button>
                </div>
            </form>
            </div>
    <div className="container flex-wrap justify-content-center question-board">
        <div className="row justify-content-center">
            {
                questions.map((question, i) =>
                <div className="card text-center question-card" key = {i}>
                    <div className="card-body d-flex flex-column">
                        <h2>Q</h2>
                        <p className="question-details">• { question.question }</p>
                            <a href ={`/question/${question._id}`}
                            className= "mt-auto btn shadow mb-3 reg-login-btn">
                            Read More...</a>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
    </>
    );
};

export default QuestionBoard;