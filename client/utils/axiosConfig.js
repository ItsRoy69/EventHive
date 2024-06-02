import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://eventhive-server.onrender.com/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

const updateTokenInHeaders = (token) => {
    axiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`                
}

const changeContentTypeToMultipart = () => {
    axiosConfig.defaults.headers.common["Content-Type"] = "multipart/form-data"
}

module.exports = {
    axiosConfig,
    updateTokenInHeaders,
    changeContentTypeToMultipart
} 