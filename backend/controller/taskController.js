const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')
//Get tasks
//@route GET /api/tasks
//@access Private with 0Auth

const { urlencoded } = require("body-parser")
const { findByIdAndUpdate } = require('../models/taskModel')

const getTasks = asyncHandler(async(req, res) => {
    const tasks = await Task.find()

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
            text: req.body.text
    })
    res.status(200).json(task)
})


//Update a task
//@route PUT /api/tasks/:id
//@access Private with 0Auth
const updateTask = asyncHandler(async(req, res)=>{
    const task = await Task.findById(req.params.id)

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

    await task.remove() 

    res.status(200).json({id: req.params.id})
})

module.exports ={getTasks, setTask, updateTask, deleteTask}