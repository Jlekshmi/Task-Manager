import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
/*
Page made by :Komalpreet kaur banipal - 8914834
*/
const Sidebar = () => {
  return (
    <div className="sidebar col-md-4 col-lg-3 col-xl-2 p-0">
      <div className="logo-container">
        <img
          src="/Assets/Images/logo.svg"
          alt="Organizo Logo"
          className="logo-image"
        />
      </div>
      <ul className="menu">
        <li className="menu-item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home Page
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/task-manager"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Task Manager
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink
            to="/add-task"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Task
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
