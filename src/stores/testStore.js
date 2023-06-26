import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const testStore = create((set) => {
  return {
    tests: [],
    userroles: [],
    loading: false,
    error: null,

    getTests: async (user) => {
      set({ loading: true });
      console.log("user in store");
      console.log(user);
      try {
        const response = await http.get("/tests");
        const { data } = response.data;
        console.log(data);

        const response2 = await http.get("/standard");
        const standardData = response2.data;
        // console.log(standarddata.data);

        const response3 = await http.get("/division");
        const divisionData = response3.data;
        // console.log(divisiondata.data);

        const response4 = await http.get("/subjects");
        const subjectData = response4.data;
        // console.log(standarddata.data);

        const response5 = await http.get("/userroles");
        const userRolesData = response5.data;
        console.log("User Roles Data");
        console.log(userRolesData.data);

        // Filter userRolesData based on loginUserData.user
        const filteredUserRolesData = userRolesData.data.filter((userRole) => {
          // Compare userRole.user with loginUserData.user
          return userRole.user === user._id;
        });

        console.log("Filtered User Roles Data");
        console.log(filteredUserRolesData);

        // Filter standards and divisions based on user and role IDs
        const filteredStandards = standardData.data.filter((standard) =>
          userRolesData.data.some(
            (userRole) =>
              userRole.user === user._id && userRole.standard === standard._id
          )
        );

        console.log("Filtered standard");
        console.log(filteredStandards);

        const filteredDivisions = divisionData.data.filter((division) =>
          userRolesData.data.some(
            (userRole) =>
              userRole.user === user._id && userRole.division === division._id
          )
        );

        console.log("Filtered divisions");
        console.log(filteredDivisions);

        const filteredSubject = subjectData.data.filter((subject) =>
          userRolesData.data.some(
            (userRole) =>
              userRole.user === user._id && userRole.subject === subject._id
          )
        );

        console.log("Filtered subjects");
        console.log(filteredSubject);

        const filteredTests = data.filter((test) => {
          // Check if the student's standard and division are included in the filteredStandards and filteredDivisions
          return (
            filteredStandards.some(
              (standard) => standard._id === test.standard
            ) &&
            filteredDivisions.some(
              (division) => division._id === test.division
            ) &&
            filteredSubject.some((subject) => subject._id === test.subject)
          );
        });

        console.log("Filtered Tests");
        console.log(filteredTests);

        set({ userroles: filteredUserRolesData, error: null });
        set({ standards: filteredStandards, error: null });
        set({ divisions: filteredDivisions, error: null });
        set({ subject: filteredSubject, error: null });
        set({ tests: data, error: null });
      } catch (error) {
        set({ error: error.message });
      }

      set({ loading: false });
    },

    addTest: async (
      name,
      totalMarks,
      subject,
      standard,
      division,
      year,
      highestMarks,
      averageMarks
    ) => {
      set({ loading: true });

      try {
        const response = await http.post("/tests", {
          name,
          totalMarks,
          subject,
          standard,
          division,
          year,
          highestMarks,
          averageMarks,
        });

        const { data } = response;
        console.log(data);
        set((state) => ({ tests: [...state.tests, data], error: null }));
      } catch (error) {
        set({ error: error.message });
      }

      set({ loading: false });
    },
    updateTest: async (testId, updatedName) => {
      try {
        const response = await http.patch(`/tests/${testId}`, {
          name: updatedName,
        });

        const { data } = response;

        // Update the tests array in the state with the updated test
        set((state) => ({
          tests: state.tests.map((test) =>
            test._id === testId ? { ...test, name: updatedName } : test
          ),
          error: null,
        }));

        // Handle success or display a success message
      } catch (error) {
        // Handle error or display an error message
        set({ error: error.message });
      }
    },

    deleteTest: async (testId) => {
      set({ loading: true });

      try {
        await http.delete(`/tests/${testId}`);

        set((state) => ({
          tests: state.tests.filter((test) => test._id !== testId),
          error: null,
        }));
      } catch (error) {
        set({ error: error.message });
      }

      set({ loading: false });
    },
  };
});

export default testStore;
