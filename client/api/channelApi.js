import axiosConfig from "../utils/axiosConfig";

export const channelApi = {
    // ----------------------- channels ----------------------- //
    getAllChannels: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/channel/${eventId}`)
    },

    createChannel: async (data, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/channel", data)
    }
}