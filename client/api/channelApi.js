import axiosConfig from "../utils/axiosConfig";

export const channelApi = {
    // ----------------------- channels ----------------------- //
    getAllChannels: async (token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get("/channel")
    },

    createChannel: async (data, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/channel", data)
    }
}