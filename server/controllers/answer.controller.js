const { Answer } = require("../models/answer.model");



module.exports.createNewAnswer = ( req, res ) => {

    Answer.create( req.body )
        .then( answer => res.json( answer ) )
        .catch( err=> res.json( err ) )

}


module.exports.findAllAnswers = (req,res)=>{
    
    Answer.find()
        .then( answers => res.json( answers ) )
        .catch( err => res.json( err ) )   

}


module.exports.findOneAnswer = ( req, res )=> { 

    Answer.findById( req.params.id )
        .then( answer => res.json( answer ) )
        .catch( err=> res.json( err ) )

}


module.exports.deleteOneAnswer = ( req, res ) => {

    Answer.findByIdAndDelete( req.params.id )
        .then( answer => res.json(  answer ) )
        .catch( err=> res.json( err ) )
        
}

