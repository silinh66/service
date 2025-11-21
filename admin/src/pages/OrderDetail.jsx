import { useState } from "react";
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

const statusConfig = {
  pending: { label: "Chờ xử lý", color: "info" },
  processing: { label: "Đang xử lý", color: "warning" },
  completed: { label: "Hoàn thành", color: "success" },
  cancelled: { label: "Đã hủy", color: "error" },
};

export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("processing");
  const [note, setNote] = useState("");
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  // Mock order data - replace with API call
  const order = {
    id,
    orderNumber: "ORD-2025-001",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "+84 123 456 789",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    },
    service: "Photo Editing",
    package: "Premium",
    description:
      "Cần chỉnh sửa 50 ảnh bất động sản, yêu cầu chất lượng cao, màu sắc sáng, loại bỏ các vật dụng không cần thiết.",
    amount: "500,000đ",
    status: "processing",
    priority: "high",
    createdDate: "2025-11-10 14:30",
    deadline: "2025-11-15",
    files: [
      { name: "house_photo_1.jpg", size: "2.4 MB" },
      { name: "house_photo_2.jpg", size: "3.1 MB" },
      { name: "requirements.pdf", size: "156 KB" },
    ],
    timeline: [
      {
        date: "2025-11-10 14:30",
        event: "Đơn hàng được tạo",
        user: "Khách hàng",
      },
      {
        date: "2025-11-10 15:00",
        event: "Đơn hàng được xác nhận",
        user: "Admin",
      },
      { date: "2025-11-10 16:00", event: "Bắt đầu xử lý", user: "Editor Team" },
    ],
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setOpenStatusDialog(true);
  };

  const handleUpdateStatus = () => {
    console.log("Updating status to:", status);
    console.log("Note:", note);
    setOpenStatusDialog(false);
    alert("Cập nhật trạng thái thành công!");
  };

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
              {order.orderNumber}
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
                label={statusConfig[order.status].label}
                color={statusConfig[order.status].color}
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
                  {order.service}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Gói
                </Typography>
                <Chip label={order.package} color="primary" size="small" />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ngày tạo
                </Typography>
                <Typography variant="body1">{order.createdDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Deadline
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "error.main", fontWeight: 600 }}
                >
                  {order.deadline}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Mô tả yêu cầu
                </Typography>
                <Typography variant="body1">{order.description}</Typography>
              </Grid>
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
              {order.files.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    mb: 1,
                  }}
                  secondaryAction={
                    <IconButton edge="end">
                      <DownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Timeline */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Lịch sử thay đổi
            </Typography>
            <List>
              {order.timeline.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <Box sx={{ mr: 2 }}>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <CalendarIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <ListItemText
                    primary={item.event}
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {item.date} • {item.user}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
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
                  secondary={order.customer.name}
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
                  secondary={order.customer.email}
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
              <Divider />
              <ListItem sx={{ px: 0, py: 1 }}>
                <PhoneIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Số điện thoại"
                  secondary={order.customer.phone}
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
              <Divider />
              <ListItem sx={{ px: 0, py: 1 }}>
                <LocationIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Địa chỉ"
                  secondary={order.customer.address}
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
                {order.amount}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Đã thanh toán
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
