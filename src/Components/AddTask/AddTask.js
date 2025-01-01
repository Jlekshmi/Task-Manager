import React, { useState } from "react";
import "./AddTask.css";

/*
Page made by : Sunny Tekrawala - 8934556
*/
const AddTask = () => {
  const people = ["Sunny Tekrawala", "Kavya Pandya", "Jayalekshmi", "Komal"];

  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "Low",
    deadline: "",
    status: "Pending",
    assignedDate: getTodayDate(),
    assignedBy: people[0],
    assignedTo: people[1],
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const validate = () => {
    const validationErrors = {};
    if (!task.name.trim()) validationErrors.name = "Task Name is required.";
    if (!task.description.trim())
      validationErrors.description = "Description is required.";
    if (!task.deadline) validationErrors.deadline = "Deadline is required.";
    if (task.assignedBy === task.assignedTo)
      validationErrors.assignedTo =
        "Assigned By and Assigned To cannot be the same.";
    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
    setTask({
      name: "",
      description: "",
      priority: "Low",
      deadline: "",
      status: "Pending",
      assignedDate: getTodayDate(),
      assignedBy: people[0],
      assignedTo: people[1],
    });
    setErrors({});
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="row">
      <div className="col-12 border-bottom mb-3">
        <div className="page-title-box">
          <h4 className="page-title">Add New Task</h4>
        </div>
      </div>
      <div className="col-12">
        <div className="add-task-container">
          {showAlert && <div className="alert">Task added successfully!</div>}
          <form className="row" onSubmit={handleSubmit}>
            <div className=" col-12 mb-3">
              <label className="form-label" htmlFor="name">
                Task Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                value={task.name}
                onChange={handleChange}
                placeholder="Enter task name"
                required
              />
            </div>
            {errors.name && <p className="error">{errors.name}</p>}

            <div className="col-12 mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
                required
              />
            </div>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}

            <div className="col-12 col-md-4 mb-3">
              <label className="form-label" htmlFor="priority">
                Priority
              </label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="form-label" htmlFor="deadline">
                Deadline
              </label>
              <input
                className="form-control"
                type="date"
                id="deadline"
                name="deadline"
                value={task.deadline}
                onChange={handleChange}
                min={getTodayDate()}
                required
              />
            </div>
            {errors.deadline && <p className="error">{errors.deadline}</p>}

            <div className="col-12 col-md-4 mb-3">
              <label className="form-label" htmlFor="assignedDate">
                Assigned Date
              </label>
              <input
                className="form-control"
                type="date"
                id="assignedDate"
                name="assignedDate"
                value={task.assignedDate}
                readOnly
              />
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="form-label" htmlFor="assignedBy">
                Assigned By
              </label>
              <select
                className="form-select"
                id="assignedBy"
                name="assignedBy"
                value={task.assignedBy}
                onChange={handleChange}
              >
                {people.map((person, index) => (
                  <option key={index} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <label className="form-label" htmlFor="assignedTo">
                Assigned To
              </label>
              <select
                className="form-select"
                id="assignedTo"
                name="assignedTo"
                value={task.assignedTo}
                onChange={handleChange}
              >
                {people.map((person, index) => (
                  <option key={index} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>
            {errors.assignedTo && <p className="error">{errors.assignedTo}</p>}

            <div className="col-12 col-md-4 mb-3">
              <label className="form-label" htmlFor="status">
                Status
              </label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <button type="submit" className="btn btn-primary  btn-lg mt-3">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
