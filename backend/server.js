import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./utils/dbconnection.js";
import reviewRoute from "./routes/review.js";
import articleRoute from "./routes/article.js"; 
import userRoute from "./routes/user.js";
import newsRoute from "./routes/news.js";

import http from 'http';
import { EventEmitter } from 'events';

dotenv.config();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
app.use(cors({
  origin: '*',
}));

//newly added search function 
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  // perform your search logic
  res.json({ results: [...] });
});


// Apply middlewares
app.use(express.json({ limit: "40mb" }));

// Handle preflight requests (OPTIONS)
app.options('*', cors());

// Basic route to test server
app.get("/", (req, res) => {
  res.send("<h2>Your API is Working...</h2>");
});

// API routes
app.use("/api/reviews", reviewRoute);
app.use("/api/article", articleRoute);
app.use("/api/users", userRoute);
app.use("/api/news", newsRoute);

// Handle 404 - Not Found (Optional)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log error for debugging
  res.status(500).json({ message: err.message || "Server Error" });
});

// Start the server and connect to DB
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
  connect();
});
