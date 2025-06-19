import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);
export const update = (data, id) => api.put(`/update-fcm-token/${id}`, data);
export const brodcast = (data) => api.post("/brodcast", data);
export const notifyAdmin = (data) => api.post("/notify-admin", data);
export const notifySingleUser = (data) => api.post("/notify-single-user", data);

export default api;
