const express = require('express');
const taskController = require('../controllers/task.js');
const { protect } = require('../middleware/protect.js'); 

const router = express.Router();

router.use(protect);

router.get('/', taskController.getTasks);
router.post('/', taskController.addTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id', taskController.updateTask);

module.exports = router;
