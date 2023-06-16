import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useBoundStore } from "../stores/store";

export function PrivateRoute({ children }) {
  const token = useBoundStore((store) => store.token);
  const navigate = useNavigate();

  // let location = useLocation();
  // const {pathname}=location
  // console.log(pathname);

  if (!sessionStorage.getItem("loginData")) return <Navigate to="/login" />;

  const loginData = JSON.parse(sessionStorage.getItem("loginData"));

  const user = loginData.user;
  if (!sessionStorage.getItem("loginData")) {
    return <Navigate to="/login" />;
  } else if (user.role === "Subject Teacher" || user.role === "Class Teacher") {
    console.log("Admin");
    navigate(-1);
  } else {
    return children;
  }
}

export function PrivateRouteForSubjectTeacher({ children }) {
  const token = useBoundStore((store) => store.token);
  const navigate = useNavigate();

  // let location = useLocation();
  // const {pathname}=location
  // console.log(pathname);
  if (!sessionStorage.getItem("loginData")) return <Navigate to="/login" />;
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));

  const user = loginData.user;
  console.log(user.role + " Hiii");
  if (!sessionStorage.getItem("loginData")) {
    return <Navigate to="/login" />;
  } else if (user.role === "Admin" || user.role === "Class Teacher") {
    console.log("Subject Teacher");
    navigate(-1);
  } else {
    return children;
  }
}

export function PrivateRouteForClassTeacher({ children }) {
  const token = useBoundStore((store) => store.token);
  const navigate = useNavigate();

  // let location = useLocation();
  // const {pathname}=location
  // console.log(pathname);
  if (!sessionStorage.getItem("loginData")) return <Navigate to="/login" />;
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));

  const user = loginData.user;
  console.log(user.role + " Hiii");
  if (!sessionStorage.getItem("loginData")) {
    return <Navigate to="/login" />;
  } else if (user.role === "Admin" || user.role === "Subject Teacher") {
    console.log("Class Teacher");
    navigate(-1);
  } else {
    return children;
  }
}
