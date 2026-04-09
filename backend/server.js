const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

let tasks = [];

// GET
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.json(newTask);
});

// PATCH
app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: "Not found" });

  task.completed = !task.completed;
  res.json(task);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));
