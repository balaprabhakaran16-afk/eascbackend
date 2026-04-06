import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";

// Routes
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
// ✅ ENV + DB
// ===============================
dotenv.config();
connectDB();

const app = express();

// ===============================
// ✅ CORS FIX (FINAL)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://easc-frontend-jade.vercel.app",
  "https://easc-frontend-cyan.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

// ✅ Preflight fix
app.options("*", cors());

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
// ✅ Uploads folder
// ===============================
const uploadDir = path.join(path.resolve(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ uploads folder created");
}

// ===============================
// ✅ Static
// ===============================
app.use("/uploads", express.static(uploadDir));

// ===============================
// ✅ Routes
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
// ✅ Root
// ===============================
app.get("/", (req, res) => {
  res.send("EASC Backend API Running 🚀");
});

// ===============================
// ✅ 404
// ===============================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// ===============================
// ✅ Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: err.message || "Server Error" });
});

// ===============================
// ✅ Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});