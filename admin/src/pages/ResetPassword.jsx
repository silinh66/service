import { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    InputAdornment,
    IconButton,
    Link,
    CircularProgress,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    VpnKey as KeyIcon,
} from "@mui/icons-material";
import { authService } from "../services/authService";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!token) {
            setError("Invalid or missing token");
            return;
        }

        setLoading(true);

        try {
            const response = await authService.resetPassword(token, password);
            setMessage(response.message);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('/bg-login.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#1a1a2e",
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                },
            }}
        >
            <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
                {/* Logo Area */}
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Box component="span" sx={{ fontSize: "2rem" }}>🦌</Box> ROTIDER MEDIA
                    </Typography>
                </Box>

                <Card
                    sx={{
                        borderRadius: 4,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                        maxWidth: 500,
                        mx: "auto",
                        p: 2,
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h5"
                            component="h1"
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: 700, mb: 4, color: "#333" }}
                        >
                            Reset Password
                        </Typography>

                        {message && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {message}
                            </Alert>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon sx={{ transform: "rotate(135deg)" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 2, bgcolor: "#fff" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#e0e0e0" },
                                        "&:hover fieldset": { borderColor: "#bdbdbd" },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon sx={{ transform: "rotate(135deg)" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: 2, bgcolor: "#fff" },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#e0e0e0" },
                                        "&:hover fieldset": { borderColor: "#bdbdbd" },
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    bgcolor: "#ffc107",
                                    color: "#fff",
                                    borderRadius: 50,
                                    "&:hover": {
                                        bgcolor: "#ffb300",
                                    },
                                    textTransform: "uppercase",
                                    boxShadow: "none",
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "RESET PASSWORD"
                                )}
                            </Button>
                        </form>

                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => navigate("/login")}
                                underline="hover"
                                sx={{ color: "#333", fontWeight: 600 }}
                            >
                                Back to Login
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
