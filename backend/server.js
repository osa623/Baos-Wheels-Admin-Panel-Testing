import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./utils/dbconnection.js";
import reviewRoute from "./routes/review.js";
import articleRoute from "./routes/article.js"; 
import userRoute from "./routes/user.js";

const http = require('http');
const path = require('fs');
const fsPromises = require('fs').promises;



const logEvents = require('./logEvents.js');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};


const myEmitter = new MyEmitter();

const server = http.createServer((req, res) => {
     console.log(req.url, req.method);
});








//adding a listner for the log events
//myEmitter.on('log', (msg) => logEvents(msg));

/*setTimeout(()=> {
  //Emitting the Event
  myEmitter.emit('log', 'Log event emitted!');
})*/

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const whiteList = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  optionsSuccessStatus: 200
};

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
