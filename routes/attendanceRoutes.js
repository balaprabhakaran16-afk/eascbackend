import express from "express"

import {
markAttendance,
getTodayAttendance,
getStudentAttendance
} from "../controllers/attendanceController.js"

const router = express.Router()

router.post("/mark",markAttendance)

router.get("/today",getTodayAttendance)

router.get("/student/:studentId",getStudentAttendance)

export default router