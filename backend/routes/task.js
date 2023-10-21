const express = require("express");
const router = express.Router();

const Task = require("../models/task");

// get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = -(await Task.find());
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a task

router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    type: req.body.type,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  let task;
  console.log("get task", req.params.id);
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  req.task = task;
  next();
}

//get a specific task by ID

router.get("/:id", getTask, (req, res) => {
  res.json(res.task);
});

//update the specific task by ID

router.patch("/:id", getTask, async (req, res) => {
  // const task = req.task;
  console.log(req.body.title);
  console.log(req.task.title);
  if (req.body.title != null) {
    req.task.title = req.body?.title;
  }

  if (req.body.description != null) {
    req.task.description = req.body.description;
  }
  if (req.body.priority != null) {
    req.task.priority = req.body.priority;
  }
  if (req.body.type != null) {
    req.task.type = req.body.type;
  }
  try {
    const updateTask = await req.task.save();
    res.json(updateTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete the task

router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
