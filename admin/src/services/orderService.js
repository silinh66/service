import apiClient from "./api";

export const orderService = {
  getAllOrders: async (params = {}) => {
    const response = await apiClient.get("/orders", { params });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  },

  updateOrderStatus: async (id, status, note) => {
    const response = await apiClient.patch(`/orders/${id}/status`, {
      status,
      note,
    });
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await apiClient.delete(`/orders/${id}`);
    return response.data;
  },

  getOrderStats: async () => {
    const response = await apiClient.get("/orders/stats");
    return response.data;
  },
};
