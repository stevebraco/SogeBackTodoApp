import express from 'express';
import Task from '../models/taskModel.js';
import data from '../data.js';

const taskRouter = express.Router();

taskRouter.get('/seed', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const createdTasks = await Task.insertMany(data);
  try {
    res.send({ createdTasks });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

taskRouter.post('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const task = new Task({
    ...req.body,
  });

  const createdTask = await task.save();
  try {
    res.send({ message: 'Product Created', product: createdTask });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

taskRouter.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const users = await Task.find();
  try {
    res.send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

taskRouter.get('/:id', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const task = await Task.findById(req.params.id);
  try {
    if (task) {
      res.send(task);
    } else {
      res.status(404).send({ message: 'Task Not Found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

taskRouter.delete('/:id', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const task = await Task.findById(req.params.id);
  try {
    if (task) {
      const deleteTask = await task.remove();
      res.send({ message: 'Task Deleted', task: deleteTask });
    } else {
      res.status(404).send({ message: 'Task Not Found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

taskRouter.put('/:id', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  const task = await Task.findById(req.params.id);
  try {
    if (task) {
      task.title = req.body.title;
      task.description = req.body.description;
      task.completed = req.body.completed;
      task.date = req.body.date;
      const updatedTask = await task.save();
      res.send({ message: 'Task Updated', task: updatedTask });
    } else {
      res.status(404).send({ message: 'Task Not Found' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default taskRouter;
