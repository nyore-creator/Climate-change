// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Import routes
const authRoutes = require('./routes/auth');
const submissionRoutes = require('./routes/submissions');

const app = express();

// ✅ Config variables FIRST (so they’re initialized before use)
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173",              // Vite default
  "http://localhost:5174",              // alternate dev port
  "https://climate-change-n9t9.vercel.app", // deployed frontend (Vercel)
  "https://climate-change-qvdp.onrender.com" // backend domain (Render)
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes);

// ✅ Healthcheck route
app.get('/', (req, res) => res.send('🌍 Climate API running'));

// ✅ Start server + DB connection
async function start() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

start();
