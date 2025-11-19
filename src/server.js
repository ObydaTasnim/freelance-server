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
    origin: ["https://freelance-obyda.netlify.app",
      "http://localhost:5173"],
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

// ==========================================================
// FIX: START THE SERVER AND LISTEN ON THE DEFINED PORT
// ==========================================================
// Define the Port - Use environment variable or default to 5001
const PORT = process.env.PORT || 5001;

// Start listening for requests
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});

// Original file structure often uses export for testing frameworks,
// but for a standalone server, the above app.listen is required.
// You can remove the 'export default app;' line if you use the app.listen() block above,
// as the server process handles the execution.
// export default app; // REMOVE THIS LINE IF YOU ARE ADDING app.listen()
