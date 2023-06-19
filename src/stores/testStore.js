import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const testStore = create((set) => {
  return {
    tests: [],
    userroles:[],
    loading: false,
    error: null,


    getTests: async (user) => {
      set({ loading: true });
      console.log("user in store")
      console.log(user);
      try {
        const response = await http.get("/tests");
        const { data } = response.data;
        console.log(data);

      const response1 = await http.get(`/userroles?user=${user._id}`);
      console.log("users corrosponding userrole is")
      console.log(response1.data.data);
        set({userroles:response1.data.data,error:null})
        set({ tests: data, error: null });
      } catch (error) {
        set({ error: error.message });
      }

      set({ loading: false });
    },

    addTest: async (name, totalMarks, subject, standard, division, year) => {
      set({ loading: true });

      try {
        const response = await http.post("/tests", {
          name,
          totalMarks,
          subject,
          standard,
          division,
          year,
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
