import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { postService } from "../services/postService";

// Sortable Row Component
const SortableRow = ({ post, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#f5f5f5" : "inherit",
    zIndex: isDragging ? 1 : "auto",
    position: "relative",
  };

  return (
    <TableRow ref={setNodeRef} style={style} hover>
      <TableCell style={{ width: "50px" }}>
        <IconButton
          size="small"
          {...attributes}
          {...listeners}
          sx={{ cursor: "grab" }}
        >
          <DragIcon />
        </IconButton>
      </TableCell>
      {children}
    </TableRow>
  );
};

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
      setError("");
    } catch (err) {
      setError("Không thể tải danh sách bài viết");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = posts.findIndex((item) => item.id === active.id);
      const newIndex = posts.findIndex((item) => item.id === over.id);

      const newPosts = arrayMove(posts, oldIndex, newIndex);

      setPosts(newPosts);
      await saveOrder(newPosts);
    }
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const saveOrder = async (newPosts) => {
    try {
      setSavingOrder(true);
      // Send only necessary data (id) to backend
      const simplifiedPosts = newPosts.map((p) => ({ id: p.id }));
      await postService.updatePostOrder(simplifiedPosts);
      setSnackbar({
        open: true,
        message: "Cập nhật thứ tự thành công",
        severity: "success",
      });
    } catch (err) {
      console.error("Failed to save order:", err);
      setSnackbar({
        open: true,
        message: "Lỗi khi lưu thứ tự",
        severity: "error",
      });
    } finally {
      setSavingOrder(false);
    }
  };

  const handleMenuOpen = (event, post) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleEdit = () => {
    if (selectedPost) {
      navigate(`/posts/edit/${selectedPost.id}`);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedPost && window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      try {
        await postService.deletePost(selectedPost.id);
        setPosts(posts.filter((p) => p.id !== selectedPost.id));
      } catch (err) {
        alert("Không thể xóa bài viết");
      }
    }
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const getStatusColor = (status) => {
    return status === "published" ? "success" : "warning";
  };

  const getStatusText = (status) => {
    return status === "published" ? "Đã xuất bản" : "Nháp";
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Quản lý bài viết
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/posts/create")}
          sx={{ px: 3 }}
        >
          Tạo bài viết mới
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "50px" }}></TableCell>
                    <TableCell>Bài viết</TableCell>
                    <TableCell>Danh mục</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Ngày đăng</TableCell>
                    <TableCell align="center">Lượt xem</TableCell>
                    <TableCell align="center">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <SortableContext
                    items={filteredPosts.map((p) => p.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredPosts.map((post) => (
                      <SortableRow key={post.id} post={post}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              src={post.image}
                              variant="rounded"
                              sx={{ width: 50, height: 50 }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600 }}
                              >
                                {post.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                Bởi {post.author_name || "Admin"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={post.category}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusText(post.status)}
                            size="small"
                            color={getStatusColor(post.status)}
                          />
                        </TableCell>
                        <TableCell>{formatDate(post.created_at)}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            <ViewIcon fontSize="small" color="action" />
                            <Typography variant="body2">{post.views}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/posts/edit/${post.id}`)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, post)}
                          >
                            <MoreIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </SortableRow>
                    ))}
                  </SortableContext>
                </TableBody>
              </Table>
            </TableContainer>
          </DndContext>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Chỉnh sửa
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Xóa
            </MenuItem>
          </Menu>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      )}
    </Box>
  );
}
