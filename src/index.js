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
import SubjectTeacherPage from "./components/subject_teacher/subjectTeacher";
import ClassTeacherPage from "./components/class_teacher/classTeacher";
import AdminPage from "./components/admin/adminPage";
import App from "./App";
import Students from "./components/class_teacher/students";
import Reports from "./components/class_teacher/reports";

const userRole = "class_teacher";

const ConditionalNavbar = () => {
  const location = useLocation();
  const hiddenRoutes = [
    "/",
    "/about",
    "/login",
    "/register",
    "/forgot-password",
  ];
  const shouldRenderNavbar = !hiddenRoutes.includes(location.pathname);

  return shouldRenderNavbar ? <Navbar role={userRole} /> : null;
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

          <Route path="/class_teacher" element={<Students />} />
          <Route path="/class_teacher/students" element={<Students />} />
          <Route path="/class_teacher/reports" element={<Reports />} />

          <Route path="/subject_teacher" element={<SubjectTeacherPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
