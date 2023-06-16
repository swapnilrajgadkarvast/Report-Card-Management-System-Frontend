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

import App from "./App";
import Students from "./components/class_teacher/students";
import Reports from "./components/class_teacher/reports";
import Test from "./components/subject_teacher/test";
import Result from "./components/subject_teacher/result";
import Standard from "./components/admin/standards";
import Division from "./components/admin/division";
import Roles from "./components/admin/roles";
import UserRoles from "./components/admin/user_roles";
import Grades from "./components/admin/grades";

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

          {/* <Route path="/class_teacher" element={<Students />} /> */}
          <Route path="/class_teacher/students" element={<Students />} />
          <Route path="/class_teacher/reports" element={<Reports />} />

          {/* <Route path="/subject_teacher" element={<SubjectTeacherPage />} /> */}
          <Route path="/subject_teacher/test" element={<Test />} />
          <Route path="/subject_teacher/result" element={<Result />} />

          {/* <Route path="/admin" element={<AdminPage />} /> */}
          <Route path="/admin/standards" element={<Standard />} />
          <Route path="/admin/divisions" element={<Division />} />
          <Route path="/admin/roles" element={<Roles />} />
          <Route path="/admin/user_roles" element={<UserRoles />} />
          <Route path="/admin/grades" element={<Grades />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();