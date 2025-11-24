import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Card,
  CardMedia,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postService, uploadService } from "../services/postService";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
];

const categories = [
  "Photo Editing",
  "Video Editing",
  "Virtual Staging",
  "Tips & Tricks",
  "Case Study",
  "News",
];

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFormat, setVideoFormat] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await postService.getPostById(id);
      setTitle(data.title);
      setSlug(data.slug);
      setCategory(data.category);
      setExcerpt(data.excerpt || "");
      setContent(data.content);
      setImagePreview(data.featured_image || "");
      setVideos(data.videos || []);
      setVideoFormat(data.video_format || "");
      setStatus(data.status);
      setError("");
    } catch (err) {
      setError("Không thể tải bài viết");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setImagePreview("");
  };

  const handleAddVideo = () => {
    if (videoUrl.trim()) {
      // Xác định loại video (YouTube, Vimeo, hoặc link khác)
      let videoType = "link";
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        videoType = "youtube";
      } else if (videoUrl.includes("vimeo.com")) {
        videoType = "vimeo";
      }

      setVideos([
        ...videos,
        { url: videoUrl.trim(), title: "", type: videoType },
      ]);
      setVideoUrl("");
    }
  };

  const handleVideoFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Kiểm tra định dạng file
    const allowedTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
      "video/webm",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Định dạng video không hợp lệ! Chỉ chấp nhận MP4, MPEG, MOV, AVI, WMV, WebM"
      );
      return;
    }

    // Kiểm tra kích thước file (3GB)
    if (file.size > 3 * 1024 * 1024 * 1024) {
      setError("Video quá lớn! Kích thước tối đa là 3GB");
      return;
    }

    try {
      console.log("Starting video upload...", file.name, file.size);
      setUploadingVideo(true);
      setError("");

      const response = await uploadService.uploadVideo(file, (progress) => {
        console.log("Upload progress:", progress);
        setUploadProgress(progress);
      });

      console.log("Video upload successful:", response);

      // Thêm video đã upload vào danh sách
      setVideos([
        ...videos,
        {
          url: `http://localhost:5001${response.url}`,
          title: file.name,
          type: "upload",
          filename: response.filename,
        },
      ]);

      setUploadProgress(0);
    } catch (err) {
      console.error("Video upload error:", err);
      setError(err.response?.data?.message || "Lỗi khi upload video");
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleRemoveVideo = async (index) => {
    const video = videos[index];

    // Nếu là video đã upload, xóa file trên server
    if (video.type === "upload" && video.filename) {
      try {
        await uploadService.deleteVideo(video.filename);
      } catch (err) {
        console.error("Error deleting video:", err);
      }
    }

    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleVideoTitleChange = (index, title) => {
    const updatedVideos = [...videos];
    updatedVideos[index].title = title;
    setVideos(updatedVideos);
  };

  const handleSubmit = async (publishStatus) => {
    // Validation
    if (!title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết!");
      return;
    }
    if (!category) {
      setError("Vui lòng chọn danh mục!");
      return;
    }
    if (!content.trim() || content === "<p><br></p>") {
      setError("Vui lòng nhập nội dung bài viết!");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // Generate slug from title if not set
      const finalSlug =
        slug ||
        title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[đĐ]/g, "d")
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

      const postData = {
        title,
        slug: finalSlug,
        category,
        content,
        excerpt,
        featured_image: imagePreview,
        videos: videos.length > 0 ? videos : null,
        video_format: videoFormat || null,
        status: publishStatus,
      };

      await postService.updatePost(id, postData);
      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Cập nhật bài viết thất bại");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Chỉnh sửa bài viết
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            ID: #{id} • Đang chỉnh sửa
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate("/posts")}
            disabled={saving}
          >
            Hủy
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSubmit("draft")}
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : "Lưu nháp"}
          </Button>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={() =>
              handleSubmit(status === "published" ? "published" : status)
            }
            disabled={saving}
          >
            Cập nhật
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
            >
              📝 Thông tin bài viết
            </Typography>

            <TextField
              fullWidth
              label="Tiêu đề bài viết"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
              required
              helperText="Tiêu đề hấp dẫn sẽ thu hút nhiều người đọc hơn"
            />

            <TextField
              fullWidth
              label="Mô tả ngắn"
              variant="outlined"
              multiline
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              sx={{ mb: 3 }}
              helperText={`${excerpt.length}/200 ký tự`}
            />

            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2, mt: 4, color: "primary.main" }}
            >
              ✍️ Nội dung bài viết
            </Typography>
            <Box
              sx={{
                "& .quill": {
                  bgcolor: "white",
                  borderRadius: 1,
                },
                "& .ql-container": {
                  minHeight: "400px",
                  fontSize: "16px",
                },
                "& .ql-editor": {
                  minHeight: "400px",
                },
              }}
            >
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3, boxShadow: 3, bgcolor: "grey.50" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
            >
              ⚙️ Cài đặt
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }} required>
              <InputLabel>Danh mục *</InputLabel>
              <Select
                value={category}
                label="Danh mục *"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {category === "Video Editing" && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Định dạng video</InputLabel>
                <Select
                  value={videoFormat}
                  label="Định dạng video"
                  onChange={(e) => setVideoFormat(e.target.value)}
                >
                  <MenuItem value="">-- Chọn định dạng --</MenuItem>
                  <MenuItem value="horizontal">📺 Ngang (Horizontal)</MenuItem>
                  <MenuItem value="vertical">📱 Dọc (Vertical)</MenuItem>
                </Select>
              </FormControl>
            )}

            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={status}
                label="Trạng thái"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="draft">📝 Nháp</MenuItem>
                <MenuItem value="published">✅ Xuất bản</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "warning.lighter",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "warning.light",
              }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                ⚠️ Lưu ý:
              </Typography>
              <Typography variant="caption" display="block">
                • Các thay đổi sẽ được lưu khi bạn nhấn "Cập nhật"
              </Typography>
              <Typography variant="caption" display="block">
                • Nếu bài viết đã xuất bản, thay đổi sẽ hiển thị ngay
              </Typography>
              <Typography variant="caption" display="block">
                • Kiểm tra kỹ trước khi cập nhật
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}
            >
              🖼️ Ảnh đại diện
            </Typography>

            {imagePreview ? (
              <Card sx={{ position: "relative", mb: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imagePreview}
                  alt="Featured image"
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "error.main", color: "white" },
                  }}
                  onClick={handleRemoveImage}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ) : (
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  mb: 2,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
                onClick={() => document.getElementById("image-upload").click()}
              >
                <UploadIcon
                  sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Click để tải ảnh lên
                </Typography>
              </Box>
            )}

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            <Button
              fullWidth
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={() => document.getElementById("image-upload").click()}
            >
              Chọn ảnh
            </Button>
          </Paper>

          <Paper sx={{ p: 3, mt: 3, boxShadow: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}
            >
              🎥 Video
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Thêm video từ YouTube/Vimeo hoặc upload từ máy tính
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập URL video (YouTube, Vimeo...)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddVideo();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddVideo}
                disabled={!videoUrl.trim()}
              >
                Thêm
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                onChange={handleVideoFileUpload}
                disabled={uploadingVideo}
              />
              <Button
                fullWidth
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => document.getElementById("video-upload").click()}
                disabled={uploadingVideo}
              >
                {uploadingVideo
                  ? `Đang upload... ${uploadProgress}%`
                  : "Upload video từ máy tính"}
              </Button>
              {uploadingVideo && (
                <Box sx={{ mt: 1 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 4,
                      bgcolor: "grey.200",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${uploadProgress}%`,
                        height: "100%",
                        bgcolor: "primary.main",
                        transition: "width 0.3s",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>

            {videos.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {videos.map((video, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      bgcolor: "grey.50",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="caption" color="primary">
                          Video {index + 1}
                        </Typography>
                        {video.type === "youtube" && (
                          <Typography
                            variant="caption"
                            sx={{
                              bgcolor: "error.main",
                              color: "white",
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                            }}
                          >
                            YouTube
                          </Typography>
                        )}
                        {video.type === "vimeo" && (
                          <Typography
                            variant="caption"
                            sx={{
                              bgcolor: "info.main",
                              color: "white",
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                            }}
                          >
                            Vimeo
                          </Typography>
                        )}
                        {video.type === "upload" && (
                          <Typography
                            variant="caption"
                            sx={{
                              bgcolor: "success.main",
                              color: "white",
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                            }}
                          >
                            Uploaded
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveVideo(index)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Tiêu đề video (tùy chọn)"
                      value={video.title}
                      onChange={(e) =>
                        handleVideoTitleChange(index, e.target.value)
                      }
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        wordBreak: "break-all",
                      }}
                    >
                      {video.url}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Box
              sx={{
                mt: 2,
                p: 1.5,
                bgcolor: "info.lighter",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "info.light",
              }}
            >
              <Typography
                variant="caption"
                display="block"
                sx={{ fontWeight: 600, mb: 0.5 }}
              >
                💡 Hỗ trợ:
              </Typography>
              <Typography variant="caption" display="block">
                • YouTube: https://www.youtube.com/watch?v=...
              </Typography>
              <Typography variant="caption" display="block">
                • Vimeo: https://vimeo.com/...
              </Typography>
              <Typography variant="caption" display="block">
                • Upload: MP4, MOV, AVI, WMV, WebM (max 3GB)
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
