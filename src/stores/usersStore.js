import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const usersStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true });
    try {
      const response = await http.get("/users");
      const { data } = response.data;
      // console.log('Users data :')
      // console.log(data)
      set({ users: data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  getUsersById: async (userId) => {
    set({ loading: true });
    try {
      const response = await http.get(`/users/${userId}`);
      console.log(response.data);
      const { data } = response.data;
      set({ users: data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addUsers: async (userData) => {
    set({ loading: true });
    try {
      const response = await http.post("/users", userData);
      const newUser = response.data;
      console.log("New User");
      console.log(newUser);
      set((state) => ({ users: [...state.users, newUser], error: null }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteUsers: async (id) => {
    set({ loading: true });
    try {
      await http.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateUsers: async (id, updatedData) => {
    set({ loading: true });
    try {
      await http.patch(`/users/${id}`, updatedData);
      set((state) => ({ users: [...state.users], error: null }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
}));

export default usersStore;
