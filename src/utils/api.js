import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3002'


 // 註冊
export const register = async (data) => {
    const response = await axios.post(`/api/register`, {
        email: data.email,
        password: data.password,
        name: data.name,
        role: "會員",
        avatar: ""
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


// 活動管理
export const getActivityAll = async () => {
    const response = await axios.get(`/api/activity`);
    return response.data; 
};

export const getActivitys = async (id) => {
    const response = await axios.get(`/api/activity/${id}`);
    return response.data; 
};

export const addActivitys = async (data) => {
    const response = await axios.post(`/api/activity`, data);
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

export const createdJournal = async (data) => {
    const response = await axios.post(`/api/journal`, data);
    return response.data; 
};

export const updatedJournal = async (id, data) => {
    const response = await axios.put(`/api/journal/${id}`, data);
    return response.data; 
};

export const deletedJournal = async (id) => {
    const response = await axios.delete(`/api/journal/${id}`);
    return response.data; 
};




// 個人資料管理
export const getUserDetail = async (userId) => {
    const response = await axios.get(`/api/profiles`, {
        params: { userId: `${userId}` , _expand: "user" }, // 透過 params 傳遞 _expand
    });
    return response.data.length ? response.data[0] : null; // 取第一筆資料
};

// export const getUsers = async (userId) => {
//     const response = await axios.get(`/api/profiles?userId=${userId}&_expand=user`);
//     return response.data.length ? response.data[0] : null; // 取第一筆資料
// };

export const userProfiles = async (data) => {
    const response = await axios.post(`/api/profiles`, data);
    return response.data; 
};

export const updateUsers = async (id, data) => {
    const response = await axios.put(`/api/profiles/${id}`, data);
    return response.data; 
};

export const modifyUsers = async (id, data) => {
    const response = await axios.patch(`/api/profiles/${id}`, data);
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

export const updateReviews = async (id, data) => {
    const response = await axios.put(`/api/reviews/${id}`, data);
    return response.data;
};

export const deleteReviews = async (id) => {
    const response = await axios.delete(`/api/reviews/${id}`);
    return response.data;
};


// 預約訂單
export const getReservationAll = async () => {
    const response = await axios.get(`/api/reservations`);
    return response.data; 
};

export const getReservations = async (id) => {
    const response = await axios.get(`/api/reservations/${id}`);
    return response.data; 
};

export const addReservations = async (data) => {
    const response = await axios.post(`/api/reservations`, data);
    return response.data;
};

export const updateReservations = async (id, order) => {
    const response = await axios.patch (`/api/reservations/${id}`, order);
    return response.data;
};

export const deleteReservations = async (id) => {
    const response = await axios.delete(`/api/reservations/${id}`);
    return response.data;
};


// 獲取所有訂單
export const getOrderAll = async () => {
    const response = await axios.get(`/api/orders`);
    return response.data; 
};

// 獲取單筆訂單
export const getOrders = async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data; 
};

// 獲取單筆訂單
export const getOrderDetail = async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`, {
        params: { _expand: "user" }, // 透過 params 傳遞 _expand
      });
    return response.data; 
};

// 創建新訂單
export const createOrder = async (orderData) => {
    try {
        const now = new Date();
        // 生成訂單編號
        const response = await axios.get(`/api/orders?_sort=id&_order=desc&_limit=1`);
        const lastOrder = response.data[0];
        const lastSequence = lastOrder ? parseInt(lastOrder.id.slice(-4)) : 0;
        const newSequence = (lastSequence + 1).toString().padStart(4, '0');
        const dateString = now.getFullYear().toString().slice(-4) +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0');
        
        const orderId = `ORD${dateString}${newSequence}`;

        const newOrder = {
        id: orderId,
        createdAt: now.toISOString().replace('T', ' ').substring(0, 19),
        timeSlot: [
            '09:00-12:00',
            '14:00-17:00',
            '09:00-17:00',
            '18:00-21:00'
        ],
        ...orderData
        };

        const createResponse = await axios.post(`/api/orders`, newOrder);
        return createResponse.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const updateOrder = async (id, order) => {
    const response = await axios.patch(`/api/orders/${id}`, order);
    return response.data;
};


// 刪除新訂單
export const deleteOrder = async (orderId) => {
    const response = await axios.delete(`/api/orders/${orderId}`);
    return response.data;
};


// 獲取訂單相關票券
export const getTickets = async (id) => {
    const response = await axios.get(`/api/orders/${id}/tickets`);
    return response.data; 
};

// 獲取訂單相關付款記錄
export const getPayments = async (id) => {
    const response = await axios.get(`/api/orders/${id}/payments`);
    return response.data; 
};


// # 分頁
// GET http://localhost:3000/orders?_page=1&_limit=10

// # 排序
// GET http://localhost:3000/orders?_sort=createdAt&_order=desc

// # 篩選
// GET http://localhost:3000/orders?paymentStatus=PAID




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
export const getMemberAll = async () => {
    const response = await axios.get(`/api/users`);
    return response.data; 
};

export const getMembers = async (id) => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data; 
};

export const updatedMembers = async (id, data) => {
    const response = await axios.patch(`/api/users/${id}`, data);
    return response.data; 
};



// export const updatedUsers = async (id) => {
//     const response = await axios.patch(`/api/users/${id}`);
//     return response.data; 
// };