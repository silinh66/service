import api from "./api";

export const authService = {
    login: async (email, password) => {
        const response = await api.post("/auth/login", {
            username: email, // Backend expects username or email in 'username' field, or we can adjust backend. 
            // Looking at backend authController: "SELECT * FROM users WHERE username = ? OR email = ?"
            // So sending email as username works.
            password,
        });
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await api.post("/auth/forgot-password", { email });
        return response.data;
    },

    resetPassword: async (token, password) => {
        const response = await api.post("/auth/reset-password", {
            token,
            password,
        });
        return response.data;
    },

    changePassword: async (oldPassword, newPassword) => {
        const token = localStorage.getItem('token');
        const response = await api.post("/auth/change-password", {
            oldPassword,
            newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
};
