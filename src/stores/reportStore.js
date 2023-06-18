// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const reportStore = create((set) => ({
  students: [],
  standards: [],
  divisions: [],
  tests: [],
  loading: false,
  error: null,

  getReports: async () => {
    set({ loading: true });
    try {
      const loginUserData = JSON.parse(sessionStorage.getItem("loginData"));
      console.log("Login User:", loginUserData.user);

      const response = await http.get("/student");
      const { data } = response.data;
      console.log(data);

      const response2 = await http.get("/standard");
      const standarddata = response2.data;
      // console.log(standarddata.data);

      const response3 = await http.get("/division");
      const divisiondata = response3.data;
      // console.log(divisiondata.data);

      const response4 = await http.get("/tests");
      const testsdata = response4.data;
      // console.log("Tests Data");
      // console.log(testsdata.data);

      const testsNames = [...new Set(testsdata.data.map((test) => test.name))];
      // console.log("testNames");
      // console.log(testsNames);

      const response5 = await http.get("/userroles");
      const userRolesData = response5.data;
      console.log("User Roles Data");
      console.log(userRolesData.data);

      // Filter userRolesData based on loginUserData.user
      const filteredUserRolesData = userRolesData.data.filter((userRole) => {
        // Compare userRole.user with loginUserData.user
        return userRole.user === loginUserData.user._id;
      });

      console.log("Filtered User Roles Data");
      console.log(filteredUserRolesData);

      // Filter standards and divisions based on user and role IDs
      const filteredStandards = standarddata.data.filter((standard) =>
        userRolesData.data.some(
          (userRole) =>
            userRole.user === loginUserData.user._id &&
            // userRole.role === "6487fb210b1c73ffda1d7099" &&
            userRole.standard === standard._id
        )
      );

      console.log("filtered standard");
      console.log(filteredStandards);

      const filteredDivisions = divisiondata.data.filter((division) =>
        userRolesData.data.some(
          (userRole) =>
            userRole.user === loginUserData.user._id &&
            // userRole.role === "6487fb210b1c73ffda1d7099" &&
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

      const filteredTests = testsdata.data.filter((test) => {
        // Check if the test's standard and division are included in the filteredStandards and filteredDivisions
        return (
          filteredStandards.some(
            (standard) => standard._id === test.standard
          ) &&
          filteredDivisions.some((division) => division._id === test.division)
        );
      });

      // console.log("Filtered Tests");
      // console.log(filteredTests);

      const filteredTestNames = Array.from(
        new Set(filteredTests.map((test) => test.name))
      );

      // console.log("Filtered Test Names");
      // console.log(filteredTestNames);

      set({ students: filteredStudents, error: null });
      set({ standards: filteredStandards, error: null });
      set({ divisions: filteredDivisions, error: null });
      set({ tests: filteredTests, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addReport: async (reportData) => {
    set({ loading: true });
    try {
      const response = await http.post("/report", reportData);
      const { data } = response.data;
      console.log(data);
      set((state) => ({
        students: [...state.students, data],
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  //    deleteStudent: async (id) => {
  //     set({ loading: true });
  //     try {
  //       const response = await http.delete(`/student/${id}`);
  //       console.log(response.data);
  //       set((state) => ({
  //         studentDetails: state.studentDetails.filter((s) => s._id !== id),
  //         error: null,
  //       }));
  //     } catch (error) {
  //       set({ error: error.message });
  //     }
  //     set({ loading: false });
  //   },

  //   updateStudent: async (id,student) => {
  //     set({ loading: true });
  //    // console.log(id+" "+name);
  //     try {
  //       const response = await http.patch(`/student/${id}`,student);
  //       console.log(response.data)
  //       set((state)=>({studentDetails:[...state.studentDetails]}))
  //     } catch (error) {
  //       set({ error: error.message });
  //     }
  //     set({ loading: false });
  //   },
}));

export default reportStore;
