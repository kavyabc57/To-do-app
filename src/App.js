

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []); 

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;

    if (editId) {
      // Update existing todo
      setTodos(todos.map(todo => 
        todo.id === editId ? { ...todo, task } : todo
      ));
      setEditId(null);
    } else {
      // Add new todo
      const newTodo = {
        id: Date.now(),
        task,
      };
      setTodos([...todos, newTodo]);
    }
    setTask('');
  };

  // Edit todo
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTask(todo.task);
  };

  // Delete todo
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? 'Update' : 'Add'} Task
            </button>
          </div>
        </div>
      </form>

      {/* Todo List */}
      <ul className="list-group">
        {todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
              {todo.task}
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>  
            </li>
          ))
        ) : (
          <p className="text-center">No tasks yet.</p>
        )}
      </ul>
    </div>
  );
}

export default App;