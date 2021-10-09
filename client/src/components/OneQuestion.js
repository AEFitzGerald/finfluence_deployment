import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import logo from './logo.png';
import axios from 'axios'


const OneQuestion = () => {

    const history = useHistory()

    const [deleteClicked, setDeleteClicked] = useState(false)
    
    const [questionInfo, setQuestionInfo] = useState({})
    
    const [ answerInfo, setAnswerInfo ] = useState([])

    const { idQuestion } = useParams()
    
    const [answer, setAnswer] = useState( {

        answer: "",

    } )
    
    const [validationErrors, setValidationErrors] = useState( {

        answer:"",

    } )

//GET the one question by ID

    useEffect(() => {

        axios
            .get(`http://localhost:8000/api/question/${idQuestion}`)
            .then( res => {
                console.log("question", res)
                setQuestionInfo( res.data )
            } )
            .catch( err=> console.log("error while requesting answers to this question", err) )

    },[idQuestion])



    const changeHandler = e => {

        const { name, value } = e.target;

        setAnswer( {
            ...answer,
            [name]:value,
        } ) 
    }


//PUT new answer into the question's answer array, question updates with answer 
    const submitAnswer = e => {
        e.preventDefault()

        console.log("submit function for put answer in question -->")

        axios
            .put(`http://localhost:8000/api/question/${idQuestion}`, answer )
            .then( res=> {
                if ( res.data.err ) 
                    setValidationErrors( res.data.err.errors )
                else
                    setAnswerInfo( [...answerInfo, answer ] ) 
                    setAnswer({
                        answer:"",
                    })
                    console.log("this is the submitHandler response-->", res)
                    history.push(`/question/${idQuestion}`)
            } ) 
        
    }

//GET the answers to this question
    useEffect(()=> {

        axios
            .get(`http://localhost:8000/api/question/answers/${idQuestion}`)
            .then( res => {
                console.log("This is question with answer!--->", res.data)
                setAnswerInfo( res.data )
            } )
            .catch( err=> console.log("error while requesting answers to this question", err) )

    },[deleteClicked])


    //DELETE one Answer
    const deleteAnswer = ( e, id ) => {

        console.log("initiated delete process...", id)

        axios
            .delete(`http://localhost:8000/api/answer/${id}` )
            .then( res => {
                console.log("Delete Response-->", res)
                setDeleteClicked( !deleteClicked )
                setAnswerInfo( [...answerInfo, answer] )
                } )
                .catch(err => console.log("error with api call", err) )

    }


return (
    <>
    <div>
        <a href="/dashboard"><img src={ logo } className="mx-3 my-3" style={{ width:"35px"}} alt ="logo" /></a>
    </div>
    <div className="map-sidebar" id="answer-bar">
        <form 
            className="row g-3 align-items-center justify-content-center"
            autocomplete="off" 
            onSubmit={ submitAnswer }
        >
            <div className="col-auto">
                <label 
                htmlFor="answer-input" 
                className="col-form-label"
                >Post Answer to This Question:
                </label>
            </div>
            <div className="col-auto">
                <input
                    type="text"
                    id="answer" 
                    name="answer"
                    value = { answer.answer }
                    className="form-control form-input-field" 
                    onChange = { changeHandler }
                />
            </div>
            <div className="col-auto">
                {
                <p>
                    <span id="answerHelpInline" className="form-text"> 
                        {
                        validationErrors.answer? validationErrors.answer.message: ""
                        }
                    </span>
                </p>
                }
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
            <div className="card text-center question-card">
                <div className="card-body d-flex flex-column">
                    <h2>Q</h2>
                    <p className="question-details">• { questionInfo.question }</p>
                </div>
            </div>
        </div>
        <div className="row justify-content-center">
            {
            answerInfo.map(( answer, i) =>
                <div className="card question-card" key = {i}>
                    <div className="card-body d-flex flex-column">
                        <h2>A</h2>
                        <p className="question-details">{ answer.answer }</p>
                    </div>
                        <button
                            onClick={ (e)=> deleteAnswer( e, answer._id ) }
                            className= "mt-auto btn shadow mb-3 reg-login-btn"
                            >
                            Delete Answer
                        </button>
                </div>
                )
            }
        </div>
    </div>
    </>

    );

};

export default OneQuestion;
