// store.js
import {create} from 'zustand';
import axios from 'axios';

const http=axios.create({baseURL:"http://127.0.0.1:3030/"});

const standardStore = create((set) => ({
  standards:[],
  loading: false,
  error: null,

  getStandards: async () => {
    set({ loading: true });

    try {
      const response = await http.get("/standard");
      const {data}=response.data
      console.log(data);
      set({ standards:data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addStandard: async (name) => {
    set({ loading: true });
    try {
      const response = await http.post(`/standard`,{name});
      console.log(response.data)
      set((state)=>({ standards:[...state.standards,response.data]},{error: null}));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteStandard: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/standard/${id}`);
      console.log(response.data)
      set((state)=>({standards:state.standards.filter((s)=>s._id!=response.data._id)}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateStandard: async (id,name) => {
    set({ loading: true });
    console.log(id+" "+name);
    try {
      const response = await http.patch(`/standard/${id}`,{name});
      //console.log(response.data)
      set((state)=>({standards:[...state.standards]}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

}));

export default standardStore;
