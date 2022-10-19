const express = require('express')
const router  = express.Router()
const {getTasks, setTask, updateTask, deleteTask} = require('../controller/taskController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTasks).post(protect, setTask)

router.route('/:id').put(protect, updateTask).delete(protect, deleteTask)

// or you can write below :

// router.get('/',getTasks) 

// router.post('/', setTask)

// router.put('/:id', updateTask)

// router.delete('/:id', deleteTask)

module.exports = router