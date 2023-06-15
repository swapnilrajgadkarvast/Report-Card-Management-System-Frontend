import "./App.css";
import Dashboard from "./components/dashboard";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Login from "./components/login";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";

import Test from "./components/subject_teacher/test";
import Result from "./components/subject_teacher/result";

import Reports from "./components/class_teacher/reports";
import Students from "./components/class_teacher/students";

import Standards from "./components/admin/standards";
import Division from "./components/admin/division";
import Grades from "./components/admin/grades";
import Roles from "./components/admin/roles";
import UserRoles from "./components/admin/user_roles";

import {
  PrivateRoute,
  PrivateRouteForSubjectTeacher,
  PrivateRouteForClassTeacher,
} from "./components/privateRoute";
import LoginErrorPage from "./components/loginErrorPage";

function App() {
  const [login, setLogin] = useState(false);

  function canShowNavBar() {
    return (
      !window.location.pathname.includes("about") &&
      !window.location.pathname.includes("login") &&
      !window.location.pathname.includes("register") &&
      !window.location.pathname.includes("forgot-password")
    );
  }

  return (
    <>
      <div className="min-h-screen">
        {(login && canShowNavBar()) || sessionStorage.getItem("loginData") ? (
          <>
            <Navbar setLogin={setLogin} />
          </>
        ) : (
          <></>
        )}
        <div className="cols-flex-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login-error-page" element={<LoginErrorPage />} />

            <Route path="/login" element={<Login setLogin={setLogin} />}>
              Login
            </Route>
            <Route
              path="/admin/standards"
              element={
                <PrivateRoute>
                  <Standards />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/division"
              element={
                <PrivateRoute>
                  <Division />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/grades"
              element={
                <PrivateRoute>
                  <Grades />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/user_roles"
              element={
                <PrivateRoute>
                  <UserRoles />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/roles"
              element={
                <PrivateRoute>
                  <Roles />
                </PrivateRoute>
              }
            />
            <Route
              path="/subject_teacher/test"
              element={
                <PrivateRouteForSubjectTeacher>
                  <Test />
                </PrivateRouteForSubjectTeacher>
              }
            />
            <Route
              path="/subject_teacher/result"
              element={
                <PrivateRouteForSubjectTeacher>
                  <Result />
                </PrivateRouteForSubjectTeacher>
              }
            />
            <Route
              path="/class_teacher/students"
              element={
                <PrivateRouteForClassTeacher>
                  <Students />
                </PrivateRouteForClassTeacher>
              }
            />
            <Route
              path="/class_teacher/reports"
              element={
                <PrivateRouteForClassTeacher>
                  <Reports />
                </PrivateRouteForClassTeacher>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
