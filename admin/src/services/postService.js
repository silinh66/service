import apiClient from "./api";

export const uploadService = {
  uploadVideo: async (file, onProgress) => {
    const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = Date.now().toString();
    const fileName = file.name;

    let response;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("chunk", chunk, "chunk.bin");
      formData.append("chunkIndex", chunkIndex);
      formData.append("totalChunks", totalChunks);
      formData.append("fileName", fileName);
      formData.append("uploadId", uploadId);

      response = await apiClient.post("/upload/videos/chunk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            // Calculate progress for current chunk
            const chunkProgress = (progressEvent.loaded / progressEvent.total) * 100;
            // Calculate total progress
            const totalProgress = Math.round(
              ((chunkIndex * 100) + chunkProgress) / totalChunks
            );
            onProgress(Math.min(totalProgress, 99)); // Cap at 99% until final response
          }
        },
      });
    }

    if (onProgress) onProgress(100);
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
