require('dotenv').config()
const passport = require('passport')
const bodyParser = require('body-parser');
const espress = require('express');
const logger = require('morgan');
const app = espress();

const users = require('./routes/user');
const mogoClient = require('mongoose')

//setup connect monggo by 
mogoClient.connect('mongodb://localhost:27017/').then(() => console.log('Connect success')).catch(() => console.log('Connect failed'))

//Middlewares
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(passport.initialize());

// Routes
app.use('/', users)
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Server is OK'
    })
})

//Catch 404 Error and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})


// Error handler fuction
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
        // response to client
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})


//Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listening on port ${port}`))