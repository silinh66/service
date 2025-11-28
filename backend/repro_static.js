import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

console.log("__dirname:", __dirname);
console.log("Serving static from:", path.join(__dirname, "uploads"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Try accessing: http://localhost:${PORT}/uploads/images/post-26-1763977359136.png`);
});
