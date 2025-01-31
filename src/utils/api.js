import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API}/api/${import.meta.env.VITE_PATH}`,
    timeout: 5000,
});

export default api;