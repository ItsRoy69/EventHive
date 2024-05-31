import {axiosConfig, updateTokenInHeaders} from "../utils/axiosConfig";

export const eventApi = {
    // ----------------------- events ----------------------- //
    getAllEvents: async (token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get("/event")
    }
}