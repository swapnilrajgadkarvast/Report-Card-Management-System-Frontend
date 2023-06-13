import create from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  testResults: [],

  fetchTestResults: async () => {
    try {
      const response = await axios.get("/student-test-results"); // Replace '/api/test-results' with your actual API endpoint URL
      set({ testResults: response.data });
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  },
}));

export default useStore;
