import {axiosConfig, updateTokenInHeaders} from "../utils/axiosConfig";

export const eventApi = {
    // ----------------------- events ----------------------- //
    getAllEvents: async (token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get("/event")
    },
    getEventById: async (id, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/event/${id}`)
    },


    // ----------------------- sub-events ----------------------- //
    createSubEvent: async (eventId, subEvent, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/sub-event", { subEvent, eventId })
    },

    // ----------------------- vendors ----------------------- //
    getVendors: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/vendor/${eventId}`)
    }
}