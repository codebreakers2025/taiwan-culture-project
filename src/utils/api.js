import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'

export const getActivityAll = async () => {
    const response = await axios.get(`/api/activity`);
    return response.data; 
};

export const getActivitys = async (id) => {
    const response = await axios.get(`/api/activity/${id}`);
    return response.data; 
};

export const getJournal = async () => {
    const response = await axios.get(`/api/journal`);
    return response.data; 
};

export const getReviews = async () => {
    const response = await axios.get(`/api/reviews`);
    return response.data; 
};

export const register = async (userData) => {
        const response = await axios.post(`/api/register`, {
            email: userData.email,
            password: userData.password,
        });
        return response.data; 
    
};

export const login = async (userData) => {
    const response = await axios.post(`/api/signin`, userData);
    if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
    }
    return response.data; 
};

export const userSettings = async (userData) => {
    const response = await axios.post(`/api/settings`, userData);
    return response.data; 
};

export const updateUsers = async (id, userData) => {
    const response = await axios.put(`/api/settings/${id}`, userData);
    return response.data; 
};

export const getUsers = async (userId) => {
    const response = await axios.get(`/api/settings?userId=${userId}&_expand=user`);
    return response.data.length ? response.data[0] : null; // 取第一筆資料
};

export const updateAvatar = async (formData) => {
    const response = await axios.post(`/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getFavoriteAll = async () => {
    const response = await axios.get(`/api/favorites`);
    return response.data;
};

export const getFavorites = async (userId) => {
    const response = await axios.get(`/api/favorites?userId=${userId}`);
    return response.data;
};

export const addFavorites = async (data) => {
    const response = await axios.post(`/api/favorites`, data);
    return response.data;
};


export const deleteFavorites  = async (id) => {
    const response = await axios.delete(`/api/favorites/${id}`);
    return response.data;
};



export const addReviews = async (data) => {
    const response = await axios.post(`/api/reviews`, data);
    return response.data;
};

export const updateReviews = async (id) => {
    const response = await axios.post(`/api/reviews${id}`);
    return response.data;
};

export const deleteReviews = async (id) => {
    const response = await axios.delete(`/api/reviews/${id}`);
    return response.data;
};

