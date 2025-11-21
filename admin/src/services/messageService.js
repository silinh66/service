import apiClient from "./api";

export const messageService = {
  getAllConversations: async () => {
    const response = await apiClient.get("/messages/conversations");
    return response.data;
  },

  getConversationMessages: async (conversationId) => {
    const response = await apiClient.get(
      `/messages/conversations/${conversationId}`
    );
    return response.data;
  },

  sendMessage: async (conversationId, message) => {
    const response = await apiClient.post(
      `/messages/conversations/${conversationId}`,
      { message }
    );
    return response.data;
  },

  createConversation: async (data) => {
    const response = await apiClient.post("/messages/conversations", data);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get("/messages/unread-count");
    return response.data;
  },
};
