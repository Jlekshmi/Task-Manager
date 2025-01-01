import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Home.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
/*
Page made by : 8731620 - Jayalekshmi Vrinda Kumari Jayachandran
*/
const Home = () => {
  const predefinedTasks = [
    {
      name: "Complete React Project",
      description: "Work on the task manager project using React.",
      priority: "High",
      deadline: "2024-12-15",
      assignedDate: "2024-12-13",
      assignedBy: "Sunny Tekrawala",
      assignedTo: "Kavya Pandya",
      status: "Pending",
    },
    {
      name: "Team Meeting",
      description: "Discuss project requirements with the team.",
      priority: "Medium",
      deadline: "2024-12-16",
      assignedDate: "2024-12-13",
      assignedBy: "Kavya Pandya",
      assignedTo: "Jayalekshmi",
      status: "Pending",
    },
    {
      name: "Code Review",
      description: "Review the latest code changes in the repository.",
      priority: "Low",
      deadline: "2024-12-17",
      assignedDate: "2024-12-13",
      assignedBy: "Jayalekshmi",
      assignedTo: "Komal",
      status: "Pending",
    },
    {
      name: "Update Documentation",
      description: "Update the project documentation with recent changes.",
      priority: "Medium",
      deadline: "2024-12-18",
      assignedDate: "2024-12-13",
      assignedBy: "Komal",
      assignedTo: "Sunny Tekrawala",
      status: "In Progress",
    },
    {
      name: "Client Presentation",
      description: "Prepare slides and present the project to the client.",
      priority: "High",
      deadline: "2024-12-20",
      assignedDate: "2024-12-13",
      assignedBy: "Sunny Tekrawala",
      assignedTo: "Jayalekshmi",
      status: "Pending",
    },
  ];

  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calculateSummary = () => {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;
    const inProgressTasks = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;
    const completedTasks = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const highPriorityTasks = tasks.filter(
      (task) => task.priority === "High"
    ).length;
    const mediumPriorityTasks = tasks.filter(
      (task) => task.priority === "Medium"
    ).length;
    const lowPriorityTasks = tasks.filter(
      (task) => task.priority === "Low"
    ).length;

    return {
      totalTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,
    };
  };
  const summary = calculateSummary();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (!storedTasks || storedTasks.length === 0) {
      localStorage.setItem("tasks", JSON.stringify(predefinedTasks));
      setTasks(predefinedTasks);
    } else {
      setTasks(storedTasks);
    }
  }, []);

  const getTasksForDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return tasks.filter((task) => task.deadline === formattedDate);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayTasks = getTasksForDate(date);
      return dayTasks.map((task, index) => (
        <div
          key={index}
          className={`task-badge ${task.priority.toLowerCase()}`}
          title={`${task.name} (${task.priority})`}
        >
          {task.name}
        </div>
      ));
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dayTasks = getTasksForDate(date);
      if (dayTasks.some((task) => task.priority === "High"))
        return "high-priority";
      if (dayTasks.some((task) => task.priority === "Medium"))
        return "medium-priority";
      if (dayTasks.some((task) => task.priority === "Low"))
        return "low-priority";
    }
    return null;
  };

  const COLORS = ["#ffc107", "#17a2b8", "#28a745"]; // Pending, In Progress, Completed

  const statusData = [
    { name: "Pending", value: summary.pendingTasks },
    { name: "In Progress", value: summary.inProgressTasks },
    { name: "Completed", value: summary.completedTasks },
  ];

  const getUpcomingAndOverdueTasks = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingTasks = tasks.filter(
      (task) =>
        new Date(task.deadline) >= today && new Date(task.deadline) <= nextWeek
    );

    const overdueTasks = tasks.filter(
      (task) => new Date(task.deadline) < today
    );

    return { upcomingTasks, overdueTasks };
  };

  const { upcomingTasks, overdueTasks } = getUpcomingAndOverdueTasks();

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box">
          <h2 className="page-title">Welcome</h2>
        </div>
      </div>
      <div className="col-12 border-top">
        <div className="row task-summary-section">
          {/* Total Tasks */}
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <div className="card summary-card total-tasks">
              <div className="card-body">
                <h5 className="text-truncate">Total Tasks</h5>
                <h2>{summary.totalTasks}</h2>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <div className="card summary-card pending-tasks">
              <div className="card-body">
                <h5 className="text-truncate">Pending</h5>

                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{
                      width: `${
                        (summary.pendingTasks / summary.totalTasks) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <h2>{summary.pendingTasks}</h2>
              </div>
            </div>
          </div>

          {/* In Progress Tasks */}
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <div className="card summary-card in-progress-tasks">
              <div className="card-body">
                <h5 className="text-truncate">In Progress</h5>

                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{
                      width: `${
                        (summary.inProgressTasks / summary.totalTasks) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <h2>{summary.inProgressTasks}</h2>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="col-12 col-md-6 col-xl-3 mb-3">
            <div className="card summary-card completed-tasks">
              <div className="card-body">
                <h5 className="text-truncate">Completed</h5>

                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                      width: `${
                        (summary.completedTasks / summary.totalTasks) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <h2>{summary.completedTasks}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="page-title-box">
          <h4 className="page-title">Task Calendar</h4>
        </div>
      </div>
      <div className="col-12 border-top">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </div>
      <div className="col-12 pb-5">
        <div className="task-list">
          <h3>Tasks for {selectedDate.toDateString()}</h3>
          <ul className="m-0 p-0">
            {getTasksForDate(selectedDate).length > 0 ? (
              getTasksForDate(selectedDate).map((task, index) => (
                <li
                  key={index}
                  className={`task-item ${task.priority.toLowerCase()}`}
                >
                  <strong>{task.name}</strong>: {task.description} (
                  {task.priority})
                </li>
              ))
            ) : (
              <p>No tasks for this date.</p>
            )}
          </ul>
        </div>
      </div>
      <div className="col-12 h-100 mt-3">
        <div className="row">
          {/* Left-side Cards */}
          <div className="col-12 col-xl-8">
            {upcomingTasks.length > 0 || overdueTasks.length > 0 ? (
              <div className="row h-100">
                {/* Upcoming Deadlines */}
                <div className="col-md-12 mb-3">
                  <div className="card deadlines-card mb-3 h-100">
                    <div className="card-body">
                      <div className="card-title">Upcoming Deadlines</div>
                      {upcomingTasks.length > 0 ? (
                        <ul className="list-group p-0 m-0">
                          {upcomingTasks.map((task, index) => (
                            <li
                              key={index}
                              className="list-group-item d-flex row"
                            >
                              <div className="col">
                                <strong>{task.name}</strong>
                                <br />
                                <small className="text-muted mb-0">
                                  Due: {task.deadline}
                                </small>
                              </div>
                              <div className="col text-end align-content-center">
                                <span
                                  className={`badge bg-${task.priority.toLowerCase()}`}
                                >
                                  {task.priority}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">No upcoming tasks.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Overdue Tasks */}
                <div className="col-md-12 mb-3">
                  <div className="card deadlines-card mb-3 h-100 ">
                    <div className="card-body">
                      <div className="card-title">Overdue Tasks</div>
                      {overdueTasks.length > 0 ? (
                        <ul className="list-group p-0 m-0">
                          {overdueTasks.map((task, index) => (
                            <li
                              key={index}
                              className="list-group-item d-flex row"
                            >
                              <div className="col">
                                <strong>{task.name}</strong>
                                <br />
                                <small className="text-muted mb-0">
                                  Overdue Since: {task.deadline}
                                </small>
                              </div>
                              <div className="col text-end align-content-center">
                                <span className="badge bg-danger">Overdue</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">No overdue tasks.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No tasks to display.</p>
            )}
          </div>

          {/* Task Completion Status */}
          <div className="col-12 col-xl-4 d-flex mb-3">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="card-title border-bottom pb-2">
                  Task Completion Status
                </div>
                <PieChart width={300} height={300}>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="circle"
                  />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
