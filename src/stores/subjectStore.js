// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const subjectStore = create((set) => ({
  subjects: [],
  loading: false,
  error: null,

  getSubjects: async () => {
    set({ loading: true });

    try {
      const response = await http.get("/subjects");
      const { data } = response.data;
      console.log(data);
      set({ subjects: data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addSubject: async (name) => {
    set({ loading: true });

    try {
      const response = await http.post("/subjects", { name });
      const { data } = response;
      console.log(data);
      set((state) => ({ subjects: [...state.subjects, data], error: null }));
    } catch (error) {
      set({ error: error.message });
    }

    set({ loading: false });
  },

  deleteSubject: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/subjects/${id}`);
      console.log(response.data);
      set((state) => ({
        subjects: state.subjects.filter((s) => s._id != response.data._id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateSubject: async (id, name) => {
    set({ loading: true });
    console.log(id + " " + name);
    try {
      const response = await http.patch(`/subjects/${id}`, { name });
      //console.log(response.data)
      set((state) => ({ subjects: [...state.subjects] }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
}));

export default subjectStore;
