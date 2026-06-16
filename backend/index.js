const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

app.use(cors({
    origin: [
        "https://shop-unik-system.netlify.app",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "API is running"
    });
});

app.use('/api', router);

const PORT = process.env.PORT || 10000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});