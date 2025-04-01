
import axios from "axios";

export enum API_METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export interface AIAPIData {
    prompt: string;
    model: 'mistral';
}
const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',


};

// export const url =   `http://localhost:11434/api/generate` 
export const url = `http://localhost:8000/api/generate`

const online = axios.create({

    baseURL: url,
    withCredentials: true,
    headers
})


export const aiAPI = {

    service: async (url: string, method: API_METHOD, model: string, data: AIAPIData) => {
        let result = null
        try {

            const response = await online[method](url, data)
            //@ts-ignore
            const reader = response.body?.getReader();
            let result = "";

            while (true) {
                const { done, value } = await reader?.read() ?? {};
                if (done) break;

                result += new TextDecoder().decode(value);
            }

            console.log("AI Response:", result);
            return result;

        } catch (error) {

            return result
        }
    }
}
