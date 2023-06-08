import React from "react";
import "./App.css";
import Login from "./containers/Layouts/login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Workspace } from "./containers/Layouts/workspace";
import { useAuth } from "./services/useAuth";
function App() {
  const isLoggedIn = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/meetingBoard" element={isLoggedIn && <Workspace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
