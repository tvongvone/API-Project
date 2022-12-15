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

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

const { ValidationError } = require('sequelize')

app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
  });

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });






module.exports = app;
