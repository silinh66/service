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
    Link,
    CircularProgress,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await authService.forgotPassword(email);
            setMessage(response.message);
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
                        <Box component="span" sx={{ fontSize: "2rem" }}>🦌</Box> ZOOZOOSTUDIO
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
                            Forgot Password
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
                                placeholder="Email"
                                variant="outlined"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
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
                                    "SEND RESET LINK"
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
                                Back to login
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
