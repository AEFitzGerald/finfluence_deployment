const jwt = require( "jsonwebtoken" )
const secret = "process.env.SECRET_KEY"

module.exports.secret = secret;

//if the user is unauthorized they get a 401

module.exports.authenticate = (req, res, next) => {

    jwt.verify( req.cookies.usertoken, secret, ( err, payload ) => {

        if ( err ) 
            res.status(401).json({ verified: false })
        
        else 
            next()
        
    } )
    
}



