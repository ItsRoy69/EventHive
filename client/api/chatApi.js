import { getAllPersonalChats } from "../../server/controllers/personalChatController";
import { updateTokenInHeaders, axiosConfig, changeContentTypeToMultipart } from "../utils/axiosConfig";

export const chatApi = {
    // ----------------------- Personal ----------------------- //
    getAllPersonalChats: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/personal-chat/all/${eventId}`)
    },
    getPersonalChatsBetweenUsers: async (userId2, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post(`/personal-chat/withUser`, { userId2 })
    },
    sendPersonalMessage: async (eventId, message, token) => {
        updateTokenInHeaders(token)
        changeContentTypeToMultipart()
        return await axiosConfig.post(`/chats/personal/${eventId}`, { message } )
    },

    // ----------------------- Group ----------------------- //
    getGroupChats: async (token, eventId) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/chats/group/${eventId}`)
    },
    sendGroupMessage: async (token, data) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post(`/chats/group`, data)
    },


}