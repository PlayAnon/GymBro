import axios from "axios";
export const ApiUrl = "http://192.168.1.106:3000"

export const Api = axios.create({
    baseURL: "http://192.168.1.106:3000"
})