// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const rolesStore = create((set) => ({
  roles: [],
  loading: false,
  error: null,

  getRoles: async () => {
    set({ loading: true });
    try {
      const response = await http.get("/roles");
      const { data } = response.data;
      console.log(data);
      set({ roles: data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addRole: async (name) => {
    set({ loading: true });
    try {
      const response = await http.post(`/roles`, { name });
      const { data } = response;
      console.log(data);
      set((state) => ({
        roles: [...state.roles, data],
        error: null,
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteRole: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/roles/${id}`);
      console.log(response.data);
      set((state) => ({
        roles: state.roles.filter((s) => s._id != response.data._id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateRole: async (id, name) => {
    set({ loading: true });
    console.log(id + " " + name);
    try {
      const response = await http.patch(`/roles/${id}`, { name });
      //console.log(response.data)
      set((state) => ({ roles: [...state.roles] }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
}));

export default rolesStore;
