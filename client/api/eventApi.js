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
    createEvent: async (data, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/event", { event: data })
    },


    // ----------------------- sub-events ----------------------- //
    getSubEvents: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/sub-event/${eventId}`)
    },
    createSubEvent: async (eventId, subEvent, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/sub-event", { subEvent, eventId })
    },
    getSubEvents: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/sub-event/${eventId}`)
    },

    // ----------------------- vendors ----------------------- //
    getVendors: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/vendor/${eventId}`)
    },

    // ----------------------- venues ----------------------- //
    getVenues: async (eventId) => {
        return await axiosConfig.get(`/venue`)
    },

    // ----------------------- meetings ----------------------- //
    getMeetings: async (eventId, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.get(`/meeting/${eventId}`)
    },
    createMeeting: async (eventId, meeting, token) => {
        updateTokenInHeaders(token)
        return await axiosConfig.post("/meeting", {meeting, eventId})
    }
}