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

import Navbar from "./components/Navbar";
import App from "./App";
import Standards from "./components/standards";
import Division from "./components/division";
import Roles from "./components/roles";
import Grades from "./components/grades";
import Admin from "./components/admin";
import UserRoles from "./components/userroles";

// const ConditionalNavbar = () => {
//   const location = useLocation();

//   // Define an array of paths where the Navbar should be rendered
//   const allowedPaths = ["/class_teacher", "/subject_teacher", "/admin"];

//   // Check if the current location matches any of the allowed paths
//   const shouldRenderNavbar = allowedPaths.some((path) =>
//     location.pathname.startsWith(path)
//   );

//   return shouldRenderNavbar ? <Navbar role="/admin" /> : null;
// };

const Root = () => {
  return (
    <React.StrictMode>
      <Router>
        {/* <App /> */}
        {/* <ConditionalNavbar /> */}
        {/* <Navbar/> */}
        <Routes>
        <Route path="/admin" element={<Admin/>}/> 
          <Route path="/standard" element={<Standards/>}/> 
          <Route path="/division" element={<Division/>} />
          <Route path="/roles" element={<Roles/>} />
          <Route path="/grades" element={<Grades/>} />
          <Route path="/userroles" element={<UserRoles/>} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

reportWebVitals();
