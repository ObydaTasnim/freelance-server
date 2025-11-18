import dotenv from "dotenv";
dotenv.config();  

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import jobRoutes from "./routes/jobRoutes.js";
import acceptedTaskRoutes from "./routes/acceptedTaskRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://f-m-neha.netlify.app",
      "http://localhost:5173", // keep this for local dev
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/accepted-tasks", acceptedTaskRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Freelance Marketplace API",
    version: "1.0.0",
    status: "Running",
  });
});

// Error Handler 
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
