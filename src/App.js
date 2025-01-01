import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Components/Home/Home";
import TaskManager from "./Components/TaskManager/TaskManager";
import AddTask from "./Components/AddTask/AddTask";
import "./App.css";
/*
Page made by :Komalpreet kaur banipal - 8914834
*/
const App = () => {
  return (
    <Router>
      <div className="container-fluid flex-1">
        <div className="row ht-100">
          <Sidebar />
          <main className="col-md-8 col-lg-9 col-xl-10 px-md-4 page-bg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/task-manager" element={<TaskManager />} />
              <Route path="/add-task" element={<AddTask />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
