import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"; // Required for directory resolution
import connectDb from "./config/DB.js";
import UserRouter from "./routes/userRoutes.js";

// Resolve current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL, // Replace this with your frontend URL
    optionsSuccessStatus: 200,
  })
);

// Connect to the database
connectDb();

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve React static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Define your user routes
app.use("/api/user", UserRouter);

// Serve React app for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => console.log(`App is running on port: ${port}`));
