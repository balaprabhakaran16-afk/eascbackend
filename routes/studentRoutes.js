import express from "express";

import {
createStudent,
getAllStudents,
getStudentProfile,
updateStudent,
deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);

router.get("/", getAllStudents);

// ⭐ PROFILE ROUTE
router.get("/profile/:id", getStudentProfile);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;