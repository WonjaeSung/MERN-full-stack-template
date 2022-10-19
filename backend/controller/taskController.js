const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')
const { urlencoded } = require("body-parser")
const { findByIdAndUpdate } = require('../models/taskModel')


//Get tasks
//@route GET /api/tasks
//@access Private with 0Auth

const getTasks = asyncHandler(async(req, res) => {

    const tasks = await Task.find({user: req.user.id})

    res.status(200).json(tasks)
})

//set a task
//@route POST /api/tasks
//@access Private with 0Auth
const setTask = asyncHandler(async(req, res)=>{
    // able to use req.body because of express.json() and urlencoded()
    // console.log(req.body)
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a text field")
    }
    const task = await Task.create({
            text: req.body.text,
            user: req.user.id
    })
    res.status(200).json(task)
})


//Update a task
//@route PUT /api/tasks/:id
//@access Private with 0Auth
const updateTask = asyncHandler(async(req, res)=>{
    const task = await Task.findById(req.params.id)
    
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    if(!task){
        res.status(400)
        throw new Error('Task not found')
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,
    })

    res.status(200).json(updatedTask)
})

//Delete a task
//@route DELETE /api/tasks/:id
//@access Private with 0Auth
const deleteTask = asyncHandler(async(req, res)=>{
    const task = await Task.findById(req.params.id)


    if(!task){
        res.status(400)
        throw new Error('Task not found')
    }

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //Make sure the logged in user matches the goal user
    if(task.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await task.remove() 

    res.status(200).json({id: req.params.id})
})

module.exports ={getTasks, setTask, updateTask, deleteTask}