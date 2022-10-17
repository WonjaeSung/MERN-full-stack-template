const asyncHandler = require('express-async-handler')
//Get tasks
//@route GET /api/tasks
//@access Private with 0Auth

const { urlencoded } = require("body-parser")

const getTasks = asyncHandler(async(req, res) => {
    res.status(200).json({"message":"Get goals"})
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
    res.status(200).json({"message":"Set goals"})
})


//Update a task
//@route PUT /api/tasks/:id
//@access Private with 0Auth
const updateTask = asyncHandler(async(req, res)=>{
    res.status(200).json({"message":`Update goal ${req.params.id}`})
})

//Delete a task
//@route DELETE /api/tasks/:id
//@access Private with 0Auth
const deleteTask = asyncHandler(async(req, res)=>{
    res.status(200).json({"message":`Delete goal ${req.params.id}`})
})

module.exports ={getTasks, setTask, updateTask, deleteTask}