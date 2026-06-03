const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const connectDB = require('./config/db')
const router = require('./routes')

const app = express()

const allowedOrigins = [
    'https://steady-torrone-cc03ee.netlify.app',
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is running'
    })
})

app.use('/api', router)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: true,
        message: 'Route not found'
    })
})

app.use((err, req, res, next) => {
    console.error(err.message || err)

    res.status(500).json({
        success: false,
        error: true,
        message: err.message || 'Internal server error'
    })
})

const PORT = process.env.PORT || 8080

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to DB')
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('DB connection failed:', err.message || err)
        process.exit(1)
    })
