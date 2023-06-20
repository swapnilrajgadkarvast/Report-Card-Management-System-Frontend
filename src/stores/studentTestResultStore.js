// store.js
import { create, useState, useEffect } from "zustand";
import axios from "axios";
import { classDeclaration } from "@babel/types";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const studentTestResultStore = create((set) => ({
  studentTestResultDataToDisplay:[],
  DataToDisplay:[],
  studentTestResult: [],
  userroles:[],
  grades:[],
  studentDataForDropdown:[],
  studentData: [],
  testData: [],
  loading: false,
  error: null,

  getStudentTestResult: async (user) => {

    try {
      //get user role for login user
      const userRoleresponse = await http.get(`/userroles?user=${user._id}`);
      //console.log("users corrosponding userrole is")
      //console.log(userRoleresponse.data.data);

      //assign subjectTeacher ti logged in user
      const subjectTeacher=userRoleresponse.data.data[0]
      //console.log("Subject teacher is")
     // console.log(subjectTeacher)
      const { standard, subject, division } = subjectTeacher;

      //assign subjectteacher std,div and subject to testfilter to filter out test 

      const testFilter = {
        standard,
        subject,
        division,
      };

      //student data for dropdown
      const studentResponse = await http.get(
        `/student?standard=${standard}&division=${division}`
      );
      const studentDataForDropdown=studentResponse.data
     // console.log("studnet data for dropdown")
     // console.log(studentDataForDropdown)

      //grade data for dropdown 
      const gradesResponse = await http.get("/grades");
      //console.log("data for grades dropdown in modal1")
     // console.log(gradesResponse.data.data);

      //fetching tests for subjectteacher
      const testResponse = await http.get(
        `/tests?standard=${testFilter.standard}&subject=${testFilter.subject}&division=${testFilter.division}`
      );
      const tests = testResponse.data.data;
      //console.log("tests");
      //console.log(tests);

      if (tests.length === 0) {
        console.log("No tests found");
        return;
      }
    //extracting TestIds
      const testIds = tests.map((test) => test._id);

      //fetching all studenttestresult
      const response = await http.get("/student-test-result");
      const { data } = response.data;

      //getting studenttestresult for testIds
      const filteredData = data.filter((result) =>
        testIds.includes(result.tests)
      );

    //  console.log("Student tets result data");
    //  console.log(filteredData);

      //getting student data who have given the tests
      const studentIds = filteredData.map((result) => result.student);
      const studentPromises = studentIds.map((studentId) =>
        http.get(`/student/${studentId}`)
      );

      const studentResponses = await Promise.all(studentPromises);
      const studentData = studentResponses.map((response) => response.data);

      //console.log("studentData");
     // console.log(studentData);
      let DataToDisplay1=[]

      for (const item of filteredData) {

        const searchObjectStudentData = studentData.find(
          (studentDataObj) => studentDataObj._id === item.student
        );
        if (searchObjectStudentData) {
          const Id = item._id;
          // console.log("Test result Id is=>", Id);
          //console.log("1");
          //console.log(user1)
          //console.log(typeof(user1))
          const { firstName, lastName } = searchObjectStudentData;
          //  console.log(firstName+" "+lastName);
          const studentname = firstName + " " + lastName;
          // console.log(studentname);

          const rollNumber=searchObjectStudentData.rollNumber

          const dateOfBirth=searchObjectStudentData.dateOfBirth

          const parentDetails=searchObjectStudentData.parent.firstName+" "+searchObjectStudentData.parent.lastName+"-"+searchObjectStudentData.parent.relationship
          
          const address=searchObjectStudentData.parent.addressLine1

          const searchObjectMarks = filteredData.filter(
            (studentTestResultMarksObj) => studentTestResultMarksObj.student === searchObjectStudentData._id
          );
         
          const searchObjectTestName = tests.find(
            (test) => test._id === item.tests
          );

          console.log("Test Name is")
          console.log(searchObjectTestName.name)
          
          console.log("Array of marks")
          console.log(searchObjectMarks)

          console.log("=============================");
                      const Data = {
                        Id,
                        studentname,
                        rollNumber,
                        dateOfBirth,
                        parentDetails,
                        address,
                        student:item.student,
                        tests:item.tests,
                        testName:searchObjectTestName.name,
                        obtainedMarks:"",
                      };
                      console.log(Data);
                      DataToDisplay1.push(Data);
                    }    
           }
         console.log(DataToDisplay1)
       for(const item of DataToDisplay1 )
       {
         const searchObjectTestMarks= filteredData.find(
              (searchObjectTestMarksObj) => searchObjectTestMarksObj.tests === item.tests && searchObjectTestMarksObj.student===item.student 
            );
           item.obtainedMarks=searchObjectTestMarks.obtainedMarks
       }
       console.log(DataToDisplay1)

      set({
        DataToDisplay:DataToDisplay1,
        userroles:userRoleresponse.data.data,
        grades: gradesResponse.data.data,
        studentDataForDropdown:studentDataForDropdown.data,
        studentTestResult: filteredData,
        studentData: studentData,
        testData: tests,
      });
    } catch (error) {
      console.error(error);
    }
  },

  addStudentTestResult: async (studentTestResultObj) => {
    set({ loading: true });
    try {
      const response = await http.post(`/student-test-result`, studentTestResultObj);
      console.log("response of post")
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
    obtainedMarks
  ) => {
    try {
      console.log(studentTestResultDataId);
      console.log(obtainedMarks)
      //studentTestResultDataId='64900e222869a28d16c4acc2'
      const response = await http.patch(`/student-test-result/${studentTestResultDataId}`,{obtainedMarks:parseInt(obtainedMarks)});

      const { data } = response;
      set((state) => ({
        studentTestResult: state.studentTestResult.map(
          (studentTestResultData) =>
            studentTestResultData._id === studentTestResultDataId
              ? {
                  ...studentTestResultData,
                  obtainedMarks: obtainedMarks,
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
