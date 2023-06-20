// store.js
import { create } from "zustand";
import axios from "axios";

const http = axios.create({ baseURL: "http://127.0.0.1:3030/" });

const forgotPasswordStore = create((set) => ({
  forgotPassword: [],
  loading: false,
  error: null,

  addForgotPassword: async (
    email,
    temporaryPassword,
    newPassword,
    confirmedPassword
  ) => {
    set({ loading: true });

    try {
      const response = await http.post("/forgotpassword", {
        email,
        temporaryPassword,
        newPassword,
        confirmedPassword,
      });
      const { data } = response;
      console.log(data);
      set((state) => ({
        forgotPassword: [...state.forgotPassword, data],
        error: null,
      }));
      console.log("Password set successfully");
    } catch (error) {
      set({ error: error.message });
    }

    set({ loading: false });
  },
}));

export default forgotPasswordStore;
