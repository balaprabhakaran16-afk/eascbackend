import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import classAllocationRoutes from "./routes/classAllocationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";

// ===============================
// ✅ Load ENV
// ===============================
dotenv.config();

// ===============================
// ✅ Connect DB
// ===============================
connectDB();

const app = express();

// ===============================
// ✅ CORS (LOCAL + PRODUCTION)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL // Vercel URL from ENV
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow temporarily (safe for dev)
    }
  },
  credentials: true
}));

// ===============================
// ✅ Middlewares
// ===============================
app.use(express.json());
app.use(cookieParser());

// ===============================
// ✅ Debug Logger
// ===============================
app.use((req, res, next) => {
  console.log(`📌 ${req.method} ${req.originalUrl}`);
  next();
});

// ===============================
// ✅ Uploads Folder Setup
// ===============================
const uploadDir = path.join(path.resolve(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ Created uploads folder");
}

// ===============================
// ✅ Static Files
// ===============================
app.use("/uploads", express.static(uploadDir));

// ===============================
// ✅ API Routes
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/class-allocation", classAllocationRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/placements", placementRoutes);

// ===============================
// ✅ Root Route
// ===============================
app.get("/", (req, res) => {
  res.status(200).send("EASC Backend API Running 🚀");
});

// ===============================
// ✅ 404 Handler
// ===============================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found ❌"
  });
});

// ===============================
// ✅ Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
});

// ===============================
// ✅ Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});