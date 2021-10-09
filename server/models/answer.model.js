const mongoose = require( "mongoose" )

const AnswerSchema = new mongoose.Schema( {

        answer: {

            type: String , 
            required: [ true, "Answer is required" ],
            minlength: [ 10, "Answer must be at least 10 characters" ]

        },

}, { timestamps: true } ) 

/**
 * Mongoose Model
 * @property {ObjectId} _id - Document ID
 * @property {String} answer - required, minlength = 10
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

module.exports.Answer = mongoose.model( "Answer", AnswerSchema )