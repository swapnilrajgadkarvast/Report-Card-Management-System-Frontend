// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const userrolesStore = create((set) => ({
  userroles: [],
  userRoleIds: [],
  userRolesDataToDisplay: [],
  users: [],
  roles: [],
  subjects: [],
  standards: [],
  divisions: [],
  loading: false,
  error: null,

  getUserRoles: async () => {
    set({ loading: true });
    try {
      const response = await http.get("/userroles");
      const { data } = response.data;

      const userroleIds = data.map((userRole) => userRole.user);

      const response1 = await http.get("/users");
      const usersdata = response1.data.data;

      const response2 = await http.get("/roles");
      const rolesdata = response2.data.data;

      const response3 = await http.get("/standard");
      const standarddata = response3.data.data;

      const response4 = await http.get("/division");
      const divisiondata = response4.data.data;

      const response5 = await http.get("/subjects");
      const subjectsdata = response5.data.data;

      const userRolesDataToDisplay = [];
      for (const item of data) {
        const searchObjectUser = usersdata.find(
          (userobj) => userobj._id === item.user
        );
        if (searchObjectUser) {
          const { firstName, lastName } = searchObjectUser;
          const username = firstName + " " + lastName;

          const searchObjectRole = rolesdata.find(
            (roleobj) => roleobj._id === item.role
          );
          const role = searchObjectRole.name;

          const searchObjectStandard = standarddata.find(
            (standardobj) => standardobj._id === item.standard
          );
          const standard = searchObjectStandard.name;

          const searchObjectDivision = divisiondata.find(
            (divisionobj) => divisionobj._id === item.division
          );
          const division = searchObjectDivision.name;

          const searchObjectSubject = subjectsdata.find(
            (subjectobj) => subjectobj._id === item.subject
          );
          const subject = searchObjectSubject.name;

          const year = item.year;

          const userData = {
            Id: item._id,
            username,
            role,
            standard,
            division,
            subject,
            year,
          };

          userRolesDataToDisplay.push(userData);
        }
      }

      set({ userRolesDataToDisplay, error: null });
      set({ userroles: data, error: null });
      set({ userRoleIds: userroleIds, error: null });
      set({ users: usersdata, error: null });
      set({ roles: rolesdata, error: null });
      set({ standards: standarddata, error: null });
      set({ divisions: divisiondata, error: null });
      set({ subjects: subjectsdata, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addUserRole: async (userRoleObj) => {
    try {
      set({ loading: true });
      const response = await http.post(`/userroles`, userRoleObj);
      const { data } = response;
      console.log(data);
      set((state) => ({
        userroles: [...state.userroles, data],
        error: null,
        loading: false,
      }));

      console.log("New User role added");
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteUserRole: async (userRoleId) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/userroles/${userRoleId}`);
      console.log(response.data);
      set((state) => ({
        userroles: state.userroles.filter((s) => s._id !== userRoleId),
        error: null,
      }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  updateUserRole: async (id, name) => {
    set({ loading: true });
    console.log(id + " " + name);
    try {
      const response = await http.patch(`/userroles/${id}`, { name });
      //console.log(response.data)
      set((state) => ({ userroles: [...state.userroles] }));
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
}));

export default userrolesStore;
