import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Badge,
  Divider,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const conversations = [
  {
    id: 1,
    customer: "Nguyễn Văn A",
    lastMessage: "Cho mình hỏi về gói dịch vụ Premium...",
    time: "10 phút trước",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    customer: "Trần Thị B",
    lastMessage: "Cảm ơn anh/chị đã hỗ trợ!",
    time: "1 giờ trước",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    customer: "Lê Văn C",
    lastMessage: "Khi nào có kết quả ạ?",
    time: "2 giờ trước",
    unread: 1,
    online: true,
  },
  {
    id: 4,
    customer: "Phạm Thị D",
    lastMessage: "Mình cần tư vấn về Virtual Staging",
    time: "3 giờ trước",
    unread: 0,
    online: false,
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "customer",
    text: "Xin chào, mình muốn hỏi về dịch vụ Photo Editing của bên bạn",
    time: "14:30",
  },
  {
    id: 2,
    sender: "admin",
    text: "Chào bạn! Cảm ơn bạn đã quan tâm đến dịch vụ của chúng mình. Bạn có thể cho mình biết thêm về yêu cầu của bạn được không?",
    time: "14:32",
  },
  {
    id: 3,
    sender: "customer",
    text: "Mình có khoảng 50 ảnh bất động sản cần chỉnh sửa. Bên bạn có gói nào phù hợp không?",
    time: "14:35",
  },
  {
    id: 4,
    sender: "admin",
    text: "Với 50 ảnh, mình recommend gói Premium cho bạn. Gói này bao gồm:\n- Chỉnh màu chuyên nghiệp\n- Loại bỏ vật dụng không mong muốn\n- HDR Processing\n- Sky replacement\n- Thời gian: 3-5 ngày",
    time: "14:37",
  },
  {
    id: 5,
    sender: "customer",
    text: "Cho mình hỏi về gói dịch vụ Premium thêm được không?",
    time: "14:40",
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "admin",
        text: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        Tin nhắn
      </Typography>

      <Paper sx={{ height: "calc(100vh - 200px)", display: "flex" }}>
        {/* Conversation List */}
        <Box
          sx={{
            width: 350,
            borderRight: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Tìm kiếm cuộc hội thoại..."
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
          </Box>
          <Divider />
          <List sx={{ flex: 1, overflow: "auto", p: 0 }}>
            {filteredConversations.map((conv) => (
              <ListItem
                key={conv.id}
                button
                selected={selectedConversation.id === conv.id}
                onClick={() => setSelectedConversation(conv)}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "action.selected",
                  },
                }}
              >
                <ListItemAvatar>
                  <Badge
                    variant="dot"
                    color={conv.online ? "success" : "default"}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <PersonIcon />
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {conv.customer}
                      </Typography>
                      {conv.unread > 0 && (
                        <Chip
                          label={conv.unread}
                          size="small"
                          color="primary"
                          sx={{ height: 20, minWidth: 20 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{ color: "text.secondary" }}
                      >
                        {conv.lastMessage}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {conv.time}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Badge
                variant="dot"
                color={selectedConversation.online ? "success" : "default"}
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
              </Badge>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {selectedConversation.customer}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedConversation.online
                    ? "Đang hoạt động"
                    : "Ngoại tuyến"}
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 3,
              bgcolor: "grey.50",
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender === "admin" ? "flex-end" : "flex-start",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor:
                      message.sender === "admin" ? "primary.main" : "white",
                    color:
                      message.sender === "admin" ? "white" : "text.primary",
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      opacity: 0.8,
                    }}
                  >
                    {message.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
              <IconButton size="small">
                <AttachIcon />
              </IconButton>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                  "&:disabled": { bgcolor: "action.disabledBackground" },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
