import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const testStore = create((set) => {
  return {
    tests: [],
    loading: false,
    error: null,

    getTests: async () => {
      set({ loading: true });

      try {
        const response = await http.get("/tests");
        const { data } = response.data;
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

        const { data } = response.data;
        set((state) => ({ tests: [...state.tests, data], error: null }));
      } catch (error) {
        set({ error: error.message });
      }

      set({ loading: false });
    },
  };
});

export default testStore;
