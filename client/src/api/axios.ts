import axios from "axios";

const api = axios.create({
  baseURL:
    "https://gigflow-smart-leads-dashboard-msor.onrender.com/api",
});

export default api;