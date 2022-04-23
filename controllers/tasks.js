const Task = require('../models/task');
const tasksRouter = require('express').Router();

// GET all tasks
tasksRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch {
        res.status(404).json({ error: 'Cannot get tasks' });
    }
});

// GET single task
tasksRouter.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch {
        res.status(404).json({ error: 'Cannot find task' });
    }
});

// POST new task
tasksRouter.post('/', async (req, res) => {
    const body = req.body;

    const task = new Task({
        title: body.title,
        duration: body.duration,
        difficulty: body.difficulty,
        description: body.description,
        completed: body.completed
    });

    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch {
        res.status(400).json({ error: 'Cannot create task' });
    }
});

// UPDATE task
tasksRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const task = {
        title: body.title,
        duration: body.duration,
        difficulty: body.difficulty,
        description: body.description,
        completed: body.completed
    };

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, task, { new: true });
        res.status(201).json(updatedTask);
    } catch {
        res.status(400).json({ error: 'Cannot update task' });
    }
});

// DELETE single task
tasksRouter.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch {
        res.status(400).json({ error: 'Cannot delete task' });
    } 
});

// export tasks router
module.exports = tasksRouter;