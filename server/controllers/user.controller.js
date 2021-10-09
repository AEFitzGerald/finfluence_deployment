const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { secret } = require("../config/jwt");
const { User } = require("../models/user.model");




module.exports.registration = async ( req, res ) => {

        const user = await User.create( req.body )

        user.save()
            .then( user => {

                res.cookie("usertoken", jwt.sign( {_id:user._id}, secret ), { httpOnly: true } )
                    .json( {msg: "success", user: user} )

            } ).catch( err=> res.json( err ) )
    }


module.exports.login = ( req, res ) => {

        User.findOne( { email: req.body.email } )
            .then( user => {

                if ( ! user )
                    res.json( { msg: "User not found."} ) //email is not found
                else
                    bcrypt.compare( req.body.loginPw, user.loginPw )
                        .then(loginPwIsValid => {

                            if ( loginPwIsValid )
                                res.cookie(
                                    "usertoken",
                                    jwt.sign( {_id: user._id}, secret ), 
                                    { httpOnly: true}
                                    
                                    ).json( { msg: "success!" } )
                            else
                                res.json( { msg: "Password Incorrect"} ) //incorrect password
                            
                        } ).catch( err => res.json( {msg: "Invalid Login Attempt", err } ) )
                
            } ).catch( err=> res.json( err ) )

    }

module.exports.getLoggedInUser = ( req, res ) => {

        const decodedJWT = jwt.decode( req.cookies.usertoken, { complete: true } )

        User.findById( decodedJWT.payload._id )
            .then( user=> res.json( { user } ) )
            .catch( err=> res.json( err ) )

    }

module.exports.logout= ( req, res ) => {

        res.cookie(

            "usertoken",
            jwt.sign( {_id:"" }, secret ),
            { httpOnly:true, maxAge:0 }
        
        ).json( { msg: "Logout Successful" } )
}
