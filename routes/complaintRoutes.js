import express from "express"

import {
submitComplaint,
getAllComplaints,
replyComplaint,
updateStatus
} from "../controllers/complaintController.js"

const router = express.Router()

// STUDENT SUBMIT
router.post("/",submitComplaint)

// ADMIN VIEW ALL
router.get("/",getAllComplaints)

// ADMIN REPLY
router.put("/reply/:id",replyComplaint)

// ADMIN STATUS UPDATE
router.put("/status/:id",updateStatus)

export default router