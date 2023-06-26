import axios from "axios";

const apiEndPoint = "http://127.0.0.1:3030/authentication";

export const createAuthSlice = (set) => ({
  token: "",
  user: {},

  loginUser: async function (data) {
    data = { ...data, strategy: "local" };
    // console.log(data);
    const response = await axios.post(apiEndPoint, data);
    sessionStorage.setItem("loginData", JSON.stringify(response.data));
    // console.log(response);
    set(() => ({
      token: response.data.accessToken,
      user: response.data.users,
    }));
    return response;
  },
});
