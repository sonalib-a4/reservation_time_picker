import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./containers/Layouts/login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BrowserStorageService } from "./services/browser_storage_service";
import { Workspace } from "./containers/Layouts/workspace";
import Sidebar from "./containers/Components/Sidebar";
import TimeSlot from "./containers/Layouts/TimeSlot";
function App() {

  const loggedInUsername = BrowserStorageService.get("username");
  const loggedInUserRole = BrowserStorageService.get("role");
  
  return (
    <div className="App">
      <Router>
        { loggedInUsername && <Sidebar></Sidebar> }
        <Routes>
          <Route
            path="/"
            element={ (loggedInUsername && loggedInUsername != "") ? <Workspace /> : <Login />}
          />
          <Route path="/timeslot" element={<TimeSlot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
