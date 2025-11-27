import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import { orderService } from "../services/orderService";

const statusConfig = {
  pending: { label: "Chờ xử lý", color: "info" },
  processing: { label: "Đang xử lý", color: "warning" },
  completed: { label: "Hoàn thành", color: "success" },
  cancelled: { label: "Đã hủy", color: "error" },
};

export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  useEffect(() => {
    loadOrderDetails();
  }, [id]);

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrderById(id);
      setOrder(data);
      setStatus(data.status);
    } catch (err) {
      setError("Không thể tải thông tin đơn hàng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setOpenStatusDialog(true);
  };

  const handleUpdateStatus = async () => {
    try {
      // Implement update status API call here
      // await orderService.updateOrderStatus(id, status, note);
      console.log("Updating status to:", status);
      console.log("Note:", note);

      // Optimistic update
      setOrder({ ...order, status: status });

      setOpenStatusDialog(false);
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Cập nhật thất bại");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error || "Không tìm thấy đơn hàng"}</Alert>
        <Button startIcon={<BackIcon />} onClick={() => navigate("/orders")} sx={{ mt: 2 }}>
          Quay lại
        </Button>
      </Box>
    );
  }

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={() => navigate("/orders")}>
            <BackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Chi tiết đơn hàng
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.order_number}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Tải file
          </Button>
          <Button variant="outlined" startIcon={<UploadIcon />}>
            Gửi kết quả
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Order Status */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Trạng thái đơn hàng
              </Typography>
              <Chip
                label={statusConfig[order.status]?.label || order.status}
                color={statusConfig[order.status]?.color || "default"}
                size="medium"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => handleStatusChange("processing")}
              >
                Đang xử lý
              </Button>
              <Button
                variant="outlined"
                color="success"
                startIcon={<CheckIcon />}
                onClick={() => handleStatusChange("completed")}
              >
                Hoàn thành
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => handleStatusChange("cancelled")}
              >
                Hủy đơn
              </Button>
            </Box>
          </Paper>

          {/* Order Details */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Chi tiết dịch vụ
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Dịch vụ
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {order.category}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Gói
                </Typography>
                <Chip label={order.main_service} color="primary" size="small" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ngày tạo
                </Typography>
                <Typography variant="body1">
                  {new Date(order.created_at).toLocaleString("vi-VN")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Deadline
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "error.main", fontWeight: 600 }}
                >
                  {/* Calculate deadline or show if available */}
                  {order.deadline || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Chi tiết dịch vụ
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {order.service_details}
                </Typography>
              </Grid>
              {order.instructions && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Hướng dẫn thêm
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {order.instructions}
                  </Typography>
                </Grid>
              )}
              {order.product_url && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Link sản phẩm
                  </Typography>
                  <a href={order.product_url} target="_blank" rel="noopener noreferrer">
                    {order.product_url}
                  </a>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Files */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              File đính kèm
            </Typography>
            <List>
              {/* Assuming files are stored as JSON string or array in DB, adjust if needed */}
              {/* For now, showing placeholder if no files structure is defined in previous steps */}
              {order.sample ? (
                <ListItem
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    mb: 1,
                  }}
                  secondaryAction={
                    <IconButton edge="end" href={order.sample} target="_blank">
                      <DownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary="File mẫu (Sample)" secondary={order.sample} />
                </ListItem>
              ) : (
                <Typography variant="body2" color="text.secondary">Không có file đính kèm</Typography>
              )}
            </List>
          </Paper>

          {/* Timeline - Placeholder as backend might not support full timeline yet */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Lịch sử thay đổi
            </Typography>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <Box sx={{ mr: 2 }}>
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                  >
                    <CalendarIcon fontSize="small" />
                  </Avatar>
                </Box>
                <ListItemText
                  primary="Đơn hàng được tạo"
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(order.created_at).toLocaleString("vi-VN")} • Khách hàng
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Customer Info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Thông tin khách hàng
            </Typography>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ px: 0, py: 1 }}>
                <PersonIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Tên khách hàng"
                  secondary={order.customer_name}
                  primaryTypographyProps={{
                    variant: "caption",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.primary",
                    fontWeight: 600,
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem sx={{ px: 0, py: 1 }}>
                <EmailIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Email"
                  secondary={order.customer_email}
                  primaryTypographyProps={{
                    variant: "caption",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{
                    variant: "body2",
                    color: "text.primary",
                  }}
                />
              </ListItem>
              {/* Phone and Address are not in the createOrder payload shown earlier, add if available */}
            </List>
          </Paper>

          {/* Payment Info */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Thanh toán
            </Typography>
            <Box
              sx={{
                bgcolor: "success.lighter",
                p: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <MoneyIcon sx={{ fontSize: 48, color: "success.main", mb: 1 }} />
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "success.main" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "USD",
                }).format(order.amount || 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {/* Assuming paid if created via PayPal flow, or pending */}
                {order.status === 'pending' ? 'Chờ thanh toán' : 'Đã thanh toán'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Status Update Dialog */}
      <Dialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
            <InputLabel>Trạng thái mới</InputLabel>
            <Select
              value={status}
              label="Trạng thái mới"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending">Chờ xử lý</MenuItem>
              <MenuItem value="processing">Đang xử lý</MenuItem>
              <MenuItem value="completed">Hoàn thành</MenuItem>
              <MenuItem value="cancelled">Đã hủy</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Thêm ghi chú về việc cập nhật trạng thái..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Hủy</Button>
          <Button onClick={handleUpdateStatus} variant="contained">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
