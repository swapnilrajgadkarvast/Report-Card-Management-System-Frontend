// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const gradesStore = create((set) => ({
  grades: [],
  loading: false,
  error: null,

  getGrades: async () => {
    set({ loading: true });

    try {
      const response = await http.get("/grades");
      const { data } = response.data;
      console.log(data);
      set({ grades: data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addGrade: async (grade) => {
    set({ loading: true });
    try {
      console.log(grade);
      const response = await http.post(`/grades`, grade);
      console.log(response.data);
      set(
        (state) => (
          { grades: [...state.grades, response.data] }, { error: null }
        )
      );
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteGrade: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/grades/${id}`);
      console.log(response.data);
      set((state) => ({
        grades: state.grades.filter((s) => s._id != response.data._id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateGrade: async (id, grade) => {
    set({ loading: true });
    console.log(id);
    console.log(grade);
    try {
      const response = await http.patch(`/grades/${id}`, grade);
      // console.log(response.data);
      set((state) => ({ grades: [...state.grades] }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
}));

export default gradesStore;
