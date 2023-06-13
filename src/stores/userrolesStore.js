import { create, useState, useEffect } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const getStudentData = async (setStudentData) => {
  try {
    const response = await http.get("/student-test-result");
    const { data } = response.data;
    console.log(data);

    const studentIds = data.map((result) => result.student);
    const studentPromises = studentIds.map((studentId) =>
      http.get(`/student/${studentId}`)
    );

    const studentResponses = await Promise.all(studentPromises);
    const studentData = studentResponses.map((response) => response.data);
    console.log(studentData);

    setStudentData(studentData);
  } catch (error) {
    console.error(error);
  }
};

const studentTestResultStore = create((set) => {
  const setStudentData = (data) => set({ studentData: data });

  return {
    studentTestResult: [],
    studentData: [],
    loading: false,
    error: null,

    getStudentTestResult: async () => {
      set({ loading: true });

      try {
        const response = await http.get("/student-test-result");
        const { data } = response.data;
        console.log(data);
        set({ studentTestResult: data, error: null });
        getStudentData(setStudentData); // Call getStudentData function to fetch student data
      } catch (error) {
        set({ error: error.message });
      }
      set({ loading: false });
    },

    addStudentTestResult: async (obtainedMarks) => {
      set({ loading: true });
      try {
        const response = await http.post(`/student-test-result`, {
          obtainedMarks,
        });
        console.log(response.data);
        set((state) => ({
          studentTestResult: [...state.studentTestResult, response.data],
          error: null,
        }));
      } catch (error) {
        set({ error: error.message });
      }
      set({ loading: false });
    },

    deleteStudentTestResult: async (id) => {
      set({ loading: true });
      try {
        const response = await http.delete(`/student-test-result/${id}`);
        console.log(response.data);
        set((state) => ({
          studentTestResult: state.studentTestResult.filter(
            (s) => s._id !== response.data._id
          ),
        }));
      } catch (error) {
        set({ error: error.message });
      }
      set({ loading: false });
    },

    updateStudentTestResult: async (id, obtainedMarks) => {
      set({ loading: true });
      try {
        const response = await http.put(`/student-test-result/${id}`, {
          obtainedMarks,
        });
        //console.log(response.data)
        set((state) => ({ studentTestResult: [...state.studentTestResult] }));
      } catch (error) {
        set({ error: error.message });
      }
      set({ loading: false });
    },
  };
});

export default studentTestResultStore;