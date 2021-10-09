const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema( {

    question: {

        type: String,
        required: [ true, "A question is required" ],
        maxlength: [ 1000, "Questions cannot be longer than 1000 characters." ],
        minlength: [ 10, "A Question must be at least 10 characters long." ], 
    },

    answers: [ { type: mongoose.ObjectId, ref:'Answer'} ]
    
}, { timestamps: true } )

/**
 * Mongoose Model
 * @property {ObjectId} _id - Document ID
 * @property {String} question - required, minlength = 10, maxlength = 1000
 * @property {ObjectId[]} answer - ref = "Answer"
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */


module.exports.Question = mongoose.model( "Question", QuestionSchema )

