const mongoose = require( "mongoose" )
const bcrypt = require( "bcrypt" )


const UserSchema = new mongoose.Schema( {

    firstName: {

        type: String,
        required:[ true, "First name is required" ],
        minlength: [2, "First name must be at least 2 characters"]

    },

    lastName: {

        type: String,
        required:[ true, "Last name is required"] ,
        minlength: [3, "Last name must be at least 3 characters"]
    },

    description: {
        type: String,  
        maxlength:[ 250, "250 characters or less" ] 
    },

    email: {

        type: String,
        required: [ true, "Email is required" ],

        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"

        }
    },

    loginPw: {

        type: String,
        required: [ true, "Password is required" ],
        minlength: [ 8, "Password must be 8 characters or longer" ]

    }

}, { timestamps: true} );

// Gets and Sets the Virtual Field for confirmPw
UserSchema.virtual('confirmPw')
    .get( () => this._confirmPw )
    .set( value => this._confirmPw = value )

// Compares and validates confirmPw with loginPw
UserSchema.pre('validate', next => {

    if ( this.loginPw !== this.confirmPw ) 
    this.invalidate( "confirmPw", "loginPw must match confirmPw" )
    
    next()

} )

// If loginPw is validated then it's salted and hashed
UserSchema.pre("save", next => {

    bcrypt.hash(this.loginPw, 10 )
        .then( hash => {

            this.loginPw = hash;
            next()

        } ).catch( err => {

            console.log( "Hashing loginPw not working!", err )
            next()

        } )
} )

module.exports.User = mongoose.model("User", UserSchema)