require('dotenv').config()

const express = require( "express" )
const port = 8000;
const cookies = require( "cookie-parser" )


const app = express()
const cors = require( "cors" )

require("./server/config/mongoose.config")


app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( cookies() )


app.use( cors( {

    //accept login credentials from client 
    credentials:true,
    origin:"http://localhost:3000"

} ) )


require( "./server/routes/user.routes" )( app )
require( "./server/routes/question.routes" )( app )
require( "./server/routes/answer.routes" )( app )


app.listen(8000, ()=> console.log(`Listening on port:${ port }` ) )

