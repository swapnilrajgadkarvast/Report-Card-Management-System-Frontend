// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const studentStore1 = create((set) => ({
  studentDetails: [],
  standards: [],
  divisions: [],
  loading: false,
  error: null,

  getStudents: async () => {
    set({ loading: true });
    try {
      const loginUserData = JSON.parse(sessionStorage.getItem("loginData"));
      console.log("Login User:", loginUserData.user);

      const response = await http.get("/student");
      const { data } = response.data;
      console.log(data);

      const response3 = await http.get("/standard");
      const standarddata = response3.data;
      // console.log(standarddata.data);

      const response4 = await http.get("/division");
      const divisiondata = response4.data;
      // console.log(divisiondata.data);

      const response5 = await http.get("/userroles");
      const userRolesData = response5.data;
      // console.log("User Roles Data");
      // console.log(userRolesData.data);

      // Filter userRolesData based on loginUserData.user
      const filteredUserRolesData = userRolesData.data.filter((userRole) => {
        // Compare userRole.user with loginUserData.user
        return userRole.user === loginUserData.user._id;
      });

      // console.log("Filtered User Roles Data");
      // console.log(filteredUserRolesData);

      // Filter standards and divisions based on user and role IDs
      const filteredStandards = standarddata.data.filter((standard) =>
        userRolesData.data.some(
          (userRole) =>
            userRole.user === loginUserData.user._id &&
            userRole.standard === standard._id
        )
      );

      console.log("filtered standard");
      console.log(filteredStandards);

      const filteredDivisions = divisiondata.data.filter((division) =>
        userRolesData.data.some(
          (userRole) =>
            userRole.user === loginUserData.user._id &&
            userRole.division === division._id
        )
      );

      console.log("filtered divisions");
      console.log(filteredDivisions);

      const filteredStudents = data.filter((student) => {
        // Check if the student's standard and division are included in the filteredStandards and filteredDivisions
        return (
          filteredStandards.some(
            (standard) => standard._id === student.standard
          ) &&
          filteredDivisions.some(
            (division) => division._id === student.division
          )
        );
      });

      console.log("Filtered Students");
      console.log(filteredStudents);

      set({ students: filteredStudents, error: null });
      set({ standards: filteredStandards, error: null });
      set({ divisions: filteredDivisions, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addStudent: async (student) => {
    set({ loading: true });
    try {
      console.log(student);
      const response = await http.post("/student", student);
      console.log(response.data);
      set(
        (state) => (
          { studentDetails: [...state.studentDetails, response.data] },
          { error: null }
        )
      );
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteStudent: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/student/${id}`);
      console.log(response.data);
      set((state) => ({
        studentDetails: state.studentDetails.filter((s) => s._id != response.data._id),
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateStudent: async (id, student) => {
    set({ loading: true });
    // console.log(id+" "+name);
    try {
      const response = await http.patch(`/student/${id}`, student);
      console.log(response.data);
      set((state) => ({ studentDetails: [...state.studentDetails] }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
}));

export default studentStore1;
