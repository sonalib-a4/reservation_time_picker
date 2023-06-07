import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./containers/Layouts/login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BrowserStorageService } from "./services/browser_storage_service";
import { Workspace } from "./containers/Layouts/workspace";
import Sidebar from "./containers/Components/Sidebar";
function App() {
  const loggedInUsername = BrowserStorageService.get("username");
  const loggedInUserRole = BrowserStorageService.get("role");
  debugger;
  return (
    <div className="App">
      <Router>
        <Sidebar></Sidebar>
        <Routes>
          <Route
            path="/"
            element={loggedInUsername === "admin" ? <Workspace /> : <Login />}
          />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
