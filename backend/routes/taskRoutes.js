const express = require('express')
const router  = express.Router()
const {getTasks, setTask, updateTask, deleteTask} = require('../controller/taskController')

router.route('/').get(getTasks).post(setTask)
router.route('/:id').put(updateTask).delete(deleteTask)

// or you can write below :

// router.get('/',getTasks) 

// router.post('/', setTask)

// router.put('/:id', updateTask)

// router.delete('/:id', deleteTask)

module.exports = router