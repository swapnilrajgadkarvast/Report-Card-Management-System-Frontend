// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const userrolesStore = create((set) => ({
  userroles: [],
  userRolesDataToDisplay: [],
  username: [],
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
      //console.log(data);

      const userIds = data.map((userRole) => userRole.user);
      //console.log(userIds);

      const response1 = await http.get("/users");
      const userdata = response1.data;

      console.log("User Role Data To Display");
      // console.log(userRolesDataToDisplay);

      const response2 = await http.get("/roles");
      const rolesdata = response2.data;
      // console.log(rolesdata.data);

      const response3 = await http.get("/standard");
      const standarddata = response3.data;
      // console.log(standarddata.data);

      const response4 = await http.get("/division");
      const divisiondata = response4.data;
      // console.log(divisiondata.data);

      const response5 = await http.get("/subjects");
      const subjectsdata = response5.data;
      // console.log(subjectsdata.data);

      let userRolesDataToDisplay1 = [];

      data.forEach(function (item, index) {
        //console.log(item, index);

        const Id = item._id;

        const searchObjectUser = userdata.data.find(
          (userobj) => userobj._id === item.user
        );
        //console.log(searchObjectUser.firstName+" "+searchObjectUser.lastName);
        const username =
          searchObjectUser.firstName + " " + searchObjectUser.lastName;

        const searchObjectRole = rolesdata.data.find(
          (roleobj) => roleobj._id === item.role
        );
        // console.log(searchObjectRole.name);
        const role = searchObjectRole.name;

        const searchObjectStandard = standarddata.data.find(
          (standardobj) => standardobj._id === item.standard
        );
        //console.log(searchObjectStandard.name);
        const standard = searchObjectStandard.name;

        const searchObjectDivision = divisiondata.data.find(
          (divisionobj) => divisionobj._id === item.division
        );
        //console.log(searchObjectDivision.name);
        const division = searchObjectDivision.name;

        const searchObjectsubject = subjectsdata.data.find(
          (subjectobj) => subjectobj._id === item.subject
        );
        //console.log(searchObjectsubject.name);
        const subject = searchObjectsubject.name;

        const year = item.year;
        //console.log(item.year);

        const userData = {
          Id,
          username,
          role,
          standard,
          division,
          subject,
          year,
        };
        //console.log(userData);

        userRolesDataToDisplay1.push(userData);
      });

      console.log(userRolesDataToDisplay1);
      set({ userRolesDataToDisplay: userRolesDataToDisplay1, error: null });
      set({ userroles: data, error: null });
      set({ username: userdata.data, error: null });
      set({ roles: rolesdata.data, error: null });
      set({ standards: standarddata.data, error: null });
      set({ divisions: divisiondata.data, error: null });
      set({ subjects: subjectsdata.data, error: null });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  addUserRole: async (userRoleObj) => {
    set({ loading: true });
    try {
      const response = await http.post(`/userroles`, userRoleObj);
      console.log(response.data);
      set(
        (state) => (
          { userroles: [...state.userroles, response.data] }, { error: null }
        )
      );
      console.log("New User role added");
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },

  deleteUserRole: async (id) => {
    set({ loading: true });
    try {
      const response = await http.delete(`/userroles/${id}`);
      console.log(response.data);
      set((state) => ({
        userroles: state.userroles.filter((s) => s._id !== id),
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
