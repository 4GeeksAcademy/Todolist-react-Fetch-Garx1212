import React, { useEffect, useState } from "react";



const endpoint = "https://playground.4geeks.com/todo/users/Garx1212";

const Home = () => {
  const [tasksData, setTasksData] = useState([]);
  const [myNewTask, setMyNewTask] = useState("");

  
  const getTasks = async () => {
    try {
      const response = await fetch(endpoint);
      const tasks = await response.json();
      if (Array.isArray(tasks)) {
        setTasksData(tasks);
      } else {
        setTasksData([]);
        
      }
    } catch (error) {
      console.error("ERROR: The task is not admitted", error);
      setTasksData([]);
    }
  };


  const updateTasksOnServer = async (tasks) => {
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(tasks),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      getTasks();
    } catch (error) {
      console.error("ERROR: Failed to update tasks on server", error);
    }
  };

  
  const handleClick = async (e) => {
    e.preventDefault();
    const updatedTasks = [...tasksData, { done: false, label: myNewTask }];
    updateTasksOnServer(updatedTasks);
    setMyNewTask(""); 
  };

  
  const handleChange = (e) => {
    const value = e.target.value;
    setMyNewTask(value);
  };

 
  const removeTask = async (index) => {
    const updatedTasks = tasksData.filter((_, i) => i !== index);
    updateTasksOnServer(updatedTasks);
  };

 
  const clearTasks = async () => {
    updateTasksOnServer([]);
  };

 
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow-sm" style={{ width: "300px" }}>
        <form onSubmit={handleClick}>
          <h1 className="text-center text-muted mb-4">Todos</h1>
          <div className="form-group mb-3">
            <label>Enter your task</label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                onChange={handleChange}
                value={myNewTask}
              />
              <button type="submit" className="btn btn-success">
                <i className="fa fa-pencil"></i>
              </button>
            </div>
          </div>
        </form>
        <button className="btn btn-danger mb-3" onClick={clearTasks}>Clear All Tasks</button>
        <ul className="list-group">
          {tasksData.map((task, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              {task.label}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeTask(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
