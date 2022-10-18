const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { connect } = require('mongoose')
const port = process.env.PORT || 5000

connectDB()

const app = express()

//middleware to handle 
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tasks',require('./routes/taskRoutes'))


//overrides default express errorhandler
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))