import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'

// 活動管理
export const getActivityAll = async () => {
    const response = await axios.get(`/api/activity`);
    return response.data; 
};

export const getActivitys = async (id) => {
    const response = await axios.get(`/api/activity/${id}`);
    return response.data; 
};

export const addActivitys = async (id, data) => {
    const response = await axios.post(`/api/activity/${id}`, data);
    return response.data; 
};

export const updatedActivitys = async (id, data) => {
    const response = await axios.put(`/api/activity/${id}`, data);
    return response.data; 
};

export const deleteActivitys = async (id) => {
    const response = await axios.delete(`/api/activity/${id}`);
    return response.data; 
};

// 部落格管理
export const getJournal = async () => {
    const response = await axios.get(`/api/journal`);
    return response.data; 
};

// 註冊
export const register = async (data) => {
        const response = await axios.post(`/api/register`, {
            email: data.email,
            password: data.password,
            role: "會員",
            name: data.userName
        });
        return response.data; 
    
};

// 登入
export const login = async (data) => {
    const response = await axios.post(`/api/signin`, data);
    if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
    }
    return response.data; 
};

// 個人資料管理
export const getUsers = async (userId) => {
    const response = await axios.get(`/api/profiles?userId=${userId}&_expand=user`);
    return response.data.length ? response.data[0] : null; // 取第一筆資料
};

export const userProfiles = async (data) => {
    const response = await axios.post(`/api/profiles`, data);
    return response.data; 
};

export const updateUsers = async (id, data) => {
    const response = await axios.put(`/api/profiles/${id}`, data);
    return response.data; 
};



// 收藏列表
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


// 評價管理
export const getReviews = async () => {
    const response = await axios.get(`/api/reviews`);
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




// 圖片/文件上傳
export const updateAvatar = async (formData) => {
    const response = await axios.post(`/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};















//後台
export const getAdminUsers = async () => {
    const response = await axios.get(`/api/users`);
    return response.data; 
};