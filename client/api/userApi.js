import {axiosConfig, updateTokenInHeaders} from "../utils/axiosConfig";

export const userApi = {
    // ----------------------- auth ----------------------- //
    login: async (creds, token) => {
        updateTokenInHeaders(token); // Set token in headers
        return await axiosConfig.post("/user/login", { ...creds }); // Send request
    },
    signup: async (creds, token) => {
        updateTokenInHeaders(token); // Set token in headers
        return await axiosConfig.post("/user", { ...creds }); // Send request
      },
}