import React, { useState, useEffect } from "react";
import "./TaskManager.css";
/*
Page made by : Kavya Pandya - 8908744
*/
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handlePriorityChange = (index, newPriority) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const confirmDelete = (index) => {
    setShowModal(true);
    setDeleteIndex(index);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedTasks = tasks.filter((_, i) => i !== deleteIndex);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setShowModal(false);
      setDeleteIndex(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteIndex(null);
  };

  //  code to filter tasks based on search query, priority, and status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = Object.values(task).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesPriority =
      selectedPriority === "" || task.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "" || task.status === selectedStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <>
      <div className="row">
        <div className="col-12 border-bottom mb-3">
          <div className="page-title-box">
            <h4 className="page-title">Task Manager</h4>
          </div>
        </div>

        <div className="col-12">
          <div className="task-manager-container">
            {/* Search Input */}
            <div className="filters-container">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input form-control"
              />

              <div className="d-flex gap-2 align-self-normal">
                {/* Priority Filter */}
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="filter-dropdown form-select"
                >
                  <option value="">All Priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-select filter-dropdown  "
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            {filteredTasks.length > 0 ? (
              <>
                {/* Table for Desktop */}
                <table className="table task-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Deadline</th>
                      <th>Assigned Date</th>
                      <th>Assigned By</th>
                      <th>Assigned To</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>
                          <select
                            value={task.priority}
                            onChange={(e) =>
                              handlePriorityChange(index, e.target.value)
                            }
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td>{task.deadline}</td>
                        <td>{task.assignedDate}</td>
                        <td>{task.assignedBy}</td>
                        <td>{task.assignedTo}</td>
                        <td>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChange(index, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => confirmDelete(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Card Layout for Mobile */}
                <div className="task-cards">
                  {filteredTasks.map((task, index) => (
                    <div className="task-card" key={index}>
                      <div className="task-card-header">{task.name}</div>
                      <div className="task-card-details">
                        <span className="task-card-label">Description:</span>{" "}
                        {task.description}
                      </div>
                      <div className="task-card-details">
                        <span className="task-card-label">Priority:</span>{" "}
                        <select
                          value={task.priority}
                          onChange={(e) =>
                            handlePriorityChange(index, e.target.value)
                          }
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div className="task-card-details">
                        <span className="task-card-label">Deadline:</span>{" "}
                        {task.deadline}
                      </div>
                      <div className="task-card-details">
                        <span className="task-card-label">Assigned Date:</span>{" "}
                        {task.assignedDate}
                      </div>
                      <div className="task-card-details">
                        <span className="task-card-label">Assigned By:</span>{" "}
                        {task.assignedBy}
                      </div>
                      <div className="task-card-details">
                        <span className="task-card-label">Assigned To:</span>{" "}
                        {task.assignedTo}
                      </div>
                      <div className="task-card-details">
                        <span className="task-card-label">Status:</span>{" "}
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(index, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="task-card-actions">
                        <button
                          className="delete-btn"
                          onClick={() => confirmDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No tasks available. Please add tasks first.</p>
            )}
            {/* Confirmation Popup */}
            {showModal && (
              <div className="popup">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this task?</p>
                <div className="popup-buttons">
                  <button className="confirm-btn" onClick={handleDelete}>
                    Yes, Delete
                  </button>
                  <button className="cancel-btn" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskManager;
