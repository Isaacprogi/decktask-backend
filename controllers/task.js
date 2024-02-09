const TaskModel = require('../models/Task')

const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find({ creator: req.user });
    res.status(200).json(tasks);
  } catch (error) {
    return next({ message: 'Internal Server Error' });
  }
};

const addTask = async (req, res, next) => {
    const {title,description,status,dueDate} = req.body
    const creator = req.user
    if(!title || !description || !status || !dueDate){
        return next({ message: 'Please complete task details' });
    }
  try {
    const task = new TaskModel({ ...req.body, creator });
    const savedTask = await task.save();
    res.status(200).json(savedTask);
  } catch (error) {
    console.log(error)
    return next({ message: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    await TaskModel.findByIdAndDelete(taskId);
    res.status(200).json("success");
  } catch (error) {
    return next({ message: 'Internal Server Error' });
  }
};

const updateTask = async (req, res, next) => {
  const {title,description,status,dueDate} = req.body
    if(!title || !description || !status || !dueDate){
        return next({ message: 'Please complete task details' });
    }
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;
    await TaskModel.findByIdAndUpdate(taskId, updatedTask);
    res.status(200).json('success')
  } catch (error) {
    console.log(error)
    return next({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
