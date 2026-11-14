import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const publicRoutes = [
      "/auth/login",
      "/auth/register"
    ];
    const isPublicRoute = publicRoutes.includes(config.url);
    if (token && !isPublicRoute) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (requestError) => {
    return Promise.reject(requestError);
  }
);
export default api;
