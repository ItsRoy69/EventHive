import {axiosConfig, updateTokenInHeaders} from "../utils/axiosConfig";

export const userApi = {
    // ----------------------- auth ----------------------- //
    login: async (creds) => {
        return await axiosConfig.post("/user/login", { ...creds }); 
    },
    signup: async (creds) => {
        return await axiosConfig.post("/user", { ...creds });
      },
}