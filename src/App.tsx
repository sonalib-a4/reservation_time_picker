import "./App.css";
import Login from "./login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Workspace from "./Pages/Workspace";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/workspace" element={<Workspace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
