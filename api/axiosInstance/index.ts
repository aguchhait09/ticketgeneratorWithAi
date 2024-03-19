import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_BASE_URL
})

axiosInstance.interceptors.request.use((config)=>{
    const api_key = "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"
    if(api_key || !! config.headers) {
        config.headers.Authorization = `Bearer ${api_key}`
    }
    return config
})