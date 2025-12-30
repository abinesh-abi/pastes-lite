import axios from "axios";
import CONFIG from "./CONFIG";

// axiosInstance
export const axiosInstance = axios.create({
//   baseURL: CONFIG.SERVER_URL,
//   headers: header,
//   timeout: 2 * 60 * 1000,
});
