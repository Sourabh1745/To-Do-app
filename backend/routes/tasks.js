const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');


// get all tasks for user
router.get('/', auth, async (req, res) => {
try {
const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// create
router.post('/', auth, async (req, res) => {
try {
const { text } = req.body;
const task = new Task({ user: req.user.id, text });
await task.save();
res.json(task);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// update (toggle or edit)
router.put('/:id', auth, async (req, res) => {
try {
const { text, completed } = req.body;
const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });
if (text !== undefined) task.text = text;
if (completed !== undefined) task.completed = completed;
await task.save();
res.json(task);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// delete
router.delete('/:id', auth, async (req, res) => {
try {
const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted' });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


module.exports = router;