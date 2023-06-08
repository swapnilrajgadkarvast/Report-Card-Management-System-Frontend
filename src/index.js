import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import About from "./components/about";
import Login from "./components/login";
import App from "./App";



const Root = () => {
  return (
    <React.StrictMode>
      <Router>
          <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
