import express from "express"

import {
addPlacement,
getPlacements,
getStudentPlacement
} from "../controllers/placementController.js"

const router = express.Router()

router.post("/",addPlacement)

router.get("/",getPlacements)

router.get("/student/:id",getStudentPlacement)

export default router