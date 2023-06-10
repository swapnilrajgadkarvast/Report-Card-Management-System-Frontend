import "./App.css";
import Dashboard from "./components/dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SubjectTeacherPage from "./components/subject_teacher/subjectTeacher";
import ClassTeacherPage from "./components/class_teacher/classTeacher";
import AdminPage from "./components/admin/adminPage";

function App() {
  return (
    <>
      
      {/* <Dashboard /> */}
      {/* <Navbar role="class_teacher" />
      <Routes>
        <Route path="/subject_teacher" element={<SubjectTeacherPage />} />
        <Route path="/class_teacher" element={<ClassTeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes> */}
    </>
  );
}

export default App;
