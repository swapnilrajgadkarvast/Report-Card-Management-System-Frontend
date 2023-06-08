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
import ErrorPage from "./components/errorPage";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import About from "./components/about";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import SubjectTeacherPage from "./components/subjectTeacher";
import ClassTeacherPage from "./components/classTeacher";
import AdminPage from "./components/adminPage";
import App from "./App";

const ConditionalNavbar = () => {
  const location = useLocation();

  // Define an array of paths where the Navbar should be rendered
  const allowedPaths = ["/class_teacher", "/subject_teacher", "/admin"];

  // Check if the current location matches any of the allowed paths
  const shouldRenderNavbar = allowedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return shouldRenderNavbar ? <Navbar role="class_teacher" /> : null;
};

const Root = () => {
  return (
    <React.StrictMode>
      <Router>
        {/* <App /> */}
        <ConditionalNavbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/subject_teacher" element={<SubjectTeacherPage />} />
          <Route path="/class_teacher" element={<ClassTeacherPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
