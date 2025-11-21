import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { orderService } from "../services/orderService";

const statusConfig = {
  pending: { label: "Chờ xử lý", color: "info" },
  processing: { label: "Đang xử lý", color: "warning" },
  completed: { label: "Hoàn thành", color: "success" },
  cancelled: { label: "Đã hủy", color: "error" },
};

const priorityConfig = {
  high: { label: "Cao", color: "error" },
  normal: { label: "Bình thường", color: "default" },
  low: { label: "Thấp", color: "info" },
};

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAllOrders();
      setOrders(data);
      setError("");
    } catch (err) {
      setError("Không thể tải danh sách đơn hàng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.service_type?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    const matchesTab =
      tabValue === 0 || // All
      (tabValue === 1 && order.status === "pending") ||
      (tabValue === 2 && order.status === "processing") ||
      (tabValue === 3 && order.status === "completed");

    return matchesSearch && matchesStatus && matchesTab;
  });

  const getOrderCount = (status) => {
    if (status === "all") return orders.length;
    return orders.filter((o) => o.status === status).length;
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

      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        Quản lý đơn hàng
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
        >
          <Tab label={`Tất cả (${getOrderCount("all")})`} />
          <Tab label={`Chờ xử lý (${getOrderCount("pending")})`} />
          <Tab label={`Đang xử lý (${getOrderCount("processing")})`} />
          <Tab label={`Hoàn thành (${getOrderCount("completed")})`} />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Tìm kiếm đơn hàng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={filterStatus}
              label="Trạng thái"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="pending">Chờ xử lý</MenuItem>
              <MenuItem value="processing">Đang xử lý</MenuItem>
              <MenuItem value="completed">Hoàn thành</MenuItem>
              <MenuItem value="cancelled">Đã hủy</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Gói</TableCell>
                <TableCell align="right">Giá trị</TableCell>
                <TableCell>Ưu tiên</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {order.order_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      <Avatar
                        sx={{ width: 36, height: 36, bgcolor: "primary.main" }}
                      >
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {order.customer_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customer_email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{order.service_type}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.package_type}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: "success.main" }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.total_amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        priorityConfig[order.priority || "normal"]?.label ||
                        "Bình thường"
                      }
                      size="small"
                      color={
                        priorityConfig[order.priority || "normal"]?.color ||
                        "default"
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusConfig[order.status]?.label || order.status}
                      size="small"
                      color={statusConfig[order.status]?.color || "default"}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orders/${order.id}`);
                      }}
                    >
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredOrders.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy đơn hàng nào
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
