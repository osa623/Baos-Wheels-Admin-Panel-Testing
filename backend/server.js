import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./utils/dbconnection.js";
import reviewRoute from "./routes/review.js";
import articleRoute from "./routes/article.js"; 
import userRoute from "./routes/user.js";

import http from 'http';
import fs from 'fs';

import { promises as fsPromises } from 'fs';



import logEvents from './logEvents.js';
import { EventEmitter } from 'events';


class MyEmitter extends EventEmitter {};


const myEmitter = new MyEmitter();

const server = http.createServer((req, res) => {
     console.log(req.url, req.method);
});



dotenv.config();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;



const corsOptions = {
  origin: ['http://localhost:3000', 'https://baoswheels.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "40mb" }));

// Basic route
app.get("/", (req, res) => {
  res.send("<h2>Your API is Working...</h2>");
});

// API routes
app.use("/api/reviews", reviewRoute);
app.use("/api/articles", articleRoute);
app.use("/api/users", userRoute);

// Global error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: err.message || "Server Error" });
  } else {
    next();
  }
});

// Start the server and connect to DB
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
  connect();
});
