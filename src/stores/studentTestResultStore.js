// store.js
import { create, useState, useEffect } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const studentTestResultStore = create((set) => ({
  studentTestResult: [],
  studentData: [],
  testData: [],
  loading: false,
  error: null,

  getStudentTestResult: async (subjectTeacher) => {
    try {
      const { standard, subject, division } = subjectTeacher;

      const testFilter = {
        standard,
        subject,
        division,
      };

      const testResponse = await http.get(
        `/tests?standard=${testFilter.standard}&subject=${testFilter.subject}&division=${testFilter.division}`
      );
      const tests = testResponse.data.data;
      console.log("tests");
      console.log(tests);

      if (tests.length === 0) {
        console.log("No tests found");
        return;
      }

      const testIds = tests.map((test) => test._id);

      const response = await http.get("/student-test-result");
      const { data } = response.data;

      const filteredData = data.filter((result) =>
        testIds.includes(result.tests)
      );

      console.log("filteredData");
      console.log(filteredData);

      const studentIds = filteredData.map((result) => result.student);
      const studentPromises = studentIds.map((studentId) =>
        http.get(`/student/${studentId}`)
      );

      const studentResponses = await Promise.all(studentPromises);
      const studentData = studentResponses.map((response) => response.data);

      console.log("studentData");
      console.log(studentData);

      set({
        studentTestResult: filteredData,
        studentData: studentData,
        testData: tests,
      });
    } catch (error) {
      console.error(error);
    }
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

  updateStudentTestResult: async (
    studentTestResultDataId,
    updatedObtainedMarks
  ) => {
    try {
      const response = await http.patch(
        `/student-test-result/${studentTestResultDataId}`,
        {
          obtainedMarks: updatedObtainedMarks,
        }
      );

      const { data } = response;
      set((state) => ({
        studentTestResult: state.studentTestResult.map(
          (studentTestResultData) =>
            studentTestResultData._id === studentTestResultDataId
              ? {
                  ...studentTestResultData,
                  obtainedMarks: updatedObtainedMarks,
                }
              : studentTestResultData
        ),
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default studentTestResultStore;
