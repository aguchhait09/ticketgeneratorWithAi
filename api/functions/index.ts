import { axiosInstance } from "../axiosInstance";
import { endpoints } from "../endpoints";

export const textGenerationFunc =async(body: any) => {
    const res = axiosInstance.post(
        endpoints.gptApi.textGeneration, 
        {
            model: "gpt-3.5-turbo",
            messages: [{role: 'user', content: "hi"}]
        }
    )
    return res
}