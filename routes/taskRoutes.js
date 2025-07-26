const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask // 👈 Add this import
} = require('../controllers/taskController');

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask); // 👈 Add this route

module.exports = router;
