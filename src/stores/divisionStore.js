// store.js
import {create} from 'zustand';
import axios from 'axios';

const http=axios.create({baseURL:"http://127.0.0.1:3030/"});

const divisionStore = create((set) => ({
  divisions:[],
  loading: false,
  error: null,

  getDivisions: async () => {
    set({ loading: true });

    try {
      const response = await http.get("/division");
      const {data}=response.data
      console.log(data);
      set({ divisions:data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addDivision: async (name) => {
    set({ loading: true });
    try {
      const response = await http.post(`/division`,{name});
      
      const {data}=response.data
      console.log(data)
      set((state)=>({ divisions:[...state.divisions,data]},{error: null}));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteDivision: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/division/${id}`);
      console.log(response.data)
      set((state)=>({divisions:state.divisions.filter((s)=>s._id!=response.data._id)}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateDivision: async (id,name) => {
    set({ loading: true });
    console.log(id+" "+name);
    try {
      const response = await http.patch(`/division/${id}`,{name});
      //console.log(response.data)
      set((state) => ({
        divisions: state.divisions.map((division) =>
        division._id === id ? { ...division, name: name } : division
        ),
    }))
     // set((state)=>({divisions:[...state.divisions]}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

}));

export default divisionStore;
