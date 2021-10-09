const Users = require( "../controllers/user.controller" );
const { authenticate } = require( "../config/jwt" )


module.exports = app => {

    app.post( "/api/registration", Users.registration ) //signup

    app.post( "/api/login", Users.login ) //signin

    app.get( "/api/loggedin", authenticate, Users.getLoggedInUser )

    app.get( "/api/logout", Users.logout )
}