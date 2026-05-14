const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// ✅ CORS الصحيح
app.use(cors({
  // origin: "https://shop-unik-system.netlify.app",
  origin: "http://localhost:8081",
  credentials: true
}));
const cookieParser = require("cookie-parser")

app.use(cookieParser())
// ✅ JSON
app.use(express.json());

// ✅ test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// ✅ routes
app.use("/api", router);

// ✅ port
const PORT = process.env.PORT || 8080;

// ✅ start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("✅ Connected to DB");
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});