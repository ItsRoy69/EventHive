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
    },

    // ----------------------- gallery ----------------------- //
    uploadImage: async (data, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/image", data)
    },
    getImages: async (imageChannelId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/image/${imageChannelId}`)
    }
}