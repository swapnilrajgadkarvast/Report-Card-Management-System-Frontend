// store.js
import {create} from 'zustand';
import axios from 'axios';

const http=axios.create({baseURL:"http://127.0.0.1:3030/"});

const studentStore1 = create((set) => ({
    studentDetails: [],
    standards: [],
    divisions: [],
    loading: false,
    error: null,
  
    getStudents: async () => {
        set({ loading: true });
        try {
          const response = await http.get("/student");
          const { data } = response.data;
          console.log(data);
    
        
          const response3 = await http.get("/standard");
          const standarddata = response3.data;
          console.log(standarddata.data);
    
          const response4 = await http.get("/division");
          const divisiondata = response4.data;
          console.log(divisiondata.data);
    

          set({ studentDetails: data, error: null });
          set({ standards: standarddata.data, error: null });
          set({ divisions: divisiondata.data, error: null });
          
        } catch (error) {
          set({ error: error.message });
        }
        set({ loading: false });
      },
    
  addStudent: async (student) => {
    set({ loading: true });
    try {
        console.log(student);
      const response = await http.post("/student",student);
      console.log(response.data)
      set((state)=>({ studentDetails:[...state.studentDetails,response.data]},{error: null}));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

   deleteStudent: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/student/${id}`);
      console.log(response.data);
      set((state) => ({
        studentDetails: state.studentDetails.filter((s) => s._id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateStudent: async (id,student) => {
    set({ loading: true });
   // console.log(id+" "+name);
    try {
      const response = await http.patch(`/student/${id}`,student);
      console.log(response.data)
      set((state)=>({studentDetails:[...state.studentDetails]}))
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

}));

export default studentStore1;
