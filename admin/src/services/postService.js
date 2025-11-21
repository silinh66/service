import apiClient from "./api";

export const uploadService = {
  uploadVideo: async (file, onProgress) => {
    const formData = new FormData();
    formData.append("video", file);

    const response = await apiClient.post("/upload/videos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    return response.data;
  },

  deleteVideo: async (filename) => {
    const response = await apiClient.delete(`/upload/videos/${filename}`);
    return response.data;
  },
};

export const postService = {
  getAllPosts: async (params = {}) => {
    const response = await apiClient.get("/posts", { params });
    return response.data;
  },

  getPostById: async (id) => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await apiClient.post("/posts", postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  },

  incrementViews: async (id) => {
    const response = await apiClient.post(`/posts/${id}/views`);
    return response.data;
  },
};
