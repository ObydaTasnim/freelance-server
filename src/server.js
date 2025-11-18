import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import jobRoutes from "./routes/jobRoutes.js";
import acceptedTaskRoutes from "./routes/acceptedTaskRoutes.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://freelancing-market-placee.netlify.app",
      "http://localhost:5173",
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
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    uptime: process.uptime(),
  });
});

// Error Handler (must be last)
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
