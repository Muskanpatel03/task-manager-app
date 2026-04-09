import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const toggleTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH"
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE"
      });
      fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {loading && <p>⏳ Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="task-list">
        {!loading && tasks.length === 0 && <p>No tasks yet</p>}

        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task.id)}>✖</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;