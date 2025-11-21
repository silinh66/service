import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
} from "@mui/material";
import {
  Article as ArticleIcon,
  ShoppingCart as OrderIcon,
  Message as MessageIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const statsCards = [
  {
    title: "Tổng bài viết",
    value: "48",
    icon: <ArticleIcon />,
    color: "#1976d2",
    trend: "+12%",
  },
  {
    title: "Đơn hàng mới",
    value: "23",
    icon: <OrderIcon />,
    color: "#2e7d32",
    trend: "+8%",
  },
  {
    title: "Tin nhắn",
    value: "15",
    icon: <MessageIcon />,
    color: "#ed6c02",
    trend: "+5%",
  },
  {
    title: "Lượt truy cập",
    value: "1.2k",
    icon: <TrendingUpIcon />,
    color: "#9c27b0",
    trend: "+15%",
  },
];

const recentOrders = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    service: "Photo Editing",
    status: "Đang xử lý",
    amount: "500,000đ",
  },
  {
    id: 2,
    customer: "Trần Thị B",
    service: "Video Editing",
    status: "Hoàn thành",
    amount: "1,200,000đ",
  },
  {
    id: 3,
    customer: "Lê Văn C",
    service: "Virtual Staging",
    status: "Chờ xử lý",
    amount: "800,000đ",
  },
  {
    id: 4,
    customer: "Phạm Thị D",
    service: "Photo Editing",
    status: "Đang xử lý",
    amount: "600,000đ",
  },
];

const chartData = [
  { name: "T1", orders: 12, revenue: 8 },
  { name: "T2", orders: 19, revenue: 13 },
  { name: "T3", orders: 15, revenue: 11 },
  { name: "T4", orders: 25, revenue: 18 },
  { name: "T5", orders: 22, revenue: 16 },
  { name: "T6", orders: 30, revenue: 22 },
  { name: "T7", orders: 28, revenue: 20 },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Hoàn thành":
      return "success";
    case "Đang xử lý":
      return "warning";
    case "Chờ xử lý":
      return "info";
    default:
      return "default";
  }
};

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Chip
                      label={stat.trend}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      width: 56,
                      height: 56,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Thống kê đơn hàng
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#1976d2"
                  strokeWidth={2}
                  name="Đơn hàng"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2e7d32"
                  strokeWidth={2}
                  name="Doanh thu (triệu)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Dịch vụ phổ biến
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Photo", value: 45 },
                  { name: "Video", value: 32 },
                  { name: "Staging", value: 28 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Đơn hàng gần đây
        </Typography>
        <List>
          {recentOrders.map((order) => (
            <ListItem
              key={order.id}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                mb: 1,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {order.customer}
                    </Typography>
                    <Chip
                      label={order.service}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={`Mã đơn: #${order.id.toString().padStart(4, "0")}`}
              />
              <Box sx={{ textAlign: "right", mr: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "success.main" }}
                >
                  {order.amount}
                </Typography>
                <Chip
                  label={order.status}
                  size="small"
                  color={getStatusColor(order.status)}
                />
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
