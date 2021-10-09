const { Question } = require("../models/question.model");
const { Answer } = require("../models/answer.model")


// Create new Question POST /api/question

module.exports.createNewQuestion = ( req, res ) => {

    Question.create( req.body )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )
}     


// Find all Questions GET /api/questions

module.exports.findAllQuestions = ( req, res ) => {

    Question.find().populate( "answers" )
        .then( questions => res.json( questions ) )
        .catch( err=> res.json( err ) )
            
}


// Find one Question GET /api/question/:id

module.exports.findOneQuestion = ( req, res ) => { 

    Question.findById( req.params.id )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )

}

// Add Answer to Question - PUT - /api/question/:id

module.exports.pushAnswer = async ( req, res ) => {

    const answer = await Answer.create( req.body )

    Question.findByIdAndUpdate(

        req.params.id,
        { $push: { answers: answer._id } }, 
        { new: true }

    ).populate( "answers" )
        .then( question => res.json( question ) )
        .catch( err => res.json( err ) )

}

// Delete Question - DELETE - /api/question/:id

module.exports.deleteOneQuestion = async ( req, res ) => {

    const question = await Question.findByIdAndDelete( req.params.id ).exec()

    Answer.deleteMany( {_id: { $in: question.answers } } )
        .then( () => res.json( { message: "Deleted One Question and its Answers"} ) )
        .catch( err => res.json( err ) )
}



// Find Answers to One Question - GET - /api/question/answers/:id

module.exports.findAnswersToThisQuestion = ( req, res ) => {

    Question.findById( req.params.id ).populate( "answers" )
        .then( question => res.json( question.answers ) )
        .catch( err=> res.json( err ) )

}


// Update one Question PUT /api/question/update/:id

module.exports.updateQuestion = ( req, res ) => {
    
    Question.findByIdAndUpdate(
        
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    
        ).populate( "answers" )
            .then( question => res.json( question ) )
            .catch( err => res.json( err ) )

}






