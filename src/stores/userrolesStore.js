// store.js
import {create} from 'zustand';
import axios from 'axios';

const http=axios.create({baseURL:"http://127.0.0.1:3030/"});

const userrolesStore = create((set) => ({
  userroles:[],
  loading: false,
  error: null,

  getUserRoles: async () => {
    set({ loading: true });
    try {
      const response = await http.get("/userroles");
      const {data}=response.data
      console.log(data);
      set({ userroles:data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addUserRole: async (name) => {
    set({ loading: true });
    try {
      const response = await http.post(`/userroles`,{name});
      console.log(response.data)
      set((state)=>({ userroles:[...state.userroles,response.data]},{error: null}));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteUserRole: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/userroles/${id}`);
      console.log(response.data)
      set((state)=>({userroles:state.userroles.filter((s)=>s._id!=response.data._id)}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateUserRole: async (id,name) => {
    set({ loading: true });
    console.log(id+" "+name);
    try {
      const response = await http.patch(`/userroles/${id}`,{name});
      //console.log(response.data)
      set((state)=>({userroles:[...state.userroles]}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

}));

export default userrolesStore;
