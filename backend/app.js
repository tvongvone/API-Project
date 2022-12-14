const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const {environment} = require('./config')
const isProduction = environment === 'production'

const app = express()

app.use(morgan('dev')) // HTTP request logger middleware for node.js. predefined string passed in
app.use(cookieParser()) // parse Cookie header and populate req.cookies
// with an object keyed by the cookie names
app.use(express.json())


// Security middleware

if(!isProduction) {
    app.use(cors())
}

// helmet helps set a variety of headers to better secure app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
)

app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite:isProduction && "Lax",
        httpOnly: true
    }
}))

const routes = require('./routes')
app.use(routes)




module.exports = app;
