import api from "./api";

export const postService = {
  getAllPosts: async (params = {}) => {
    try {
      const response = await api.get("/posts", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  },

  getPostBySlug: async (slug) => {
    try {
      const response = await api.get(`/posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw error;
    }
  },

  incrementViews: async (id) => {
    try {
      const response = await api.post(`/posts/${id}/views`);
      return response.data;
    } catch (error) {
      console.error("Error incrementing views:", error);
      // Don't throw error, just log it
    }
  },
};

export default postService;
