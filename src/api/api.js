import axios from "axios";

const api = axios.create({
  baseURL: "https://money-manager-backend-1-fbxi.onrender.com",
});

export default api;
