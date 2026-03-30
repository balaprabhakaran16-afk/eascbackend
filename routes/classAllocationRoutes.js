import express from "express";
import {
  createAllocation,
  getAllocations,
  deleteAllocation,
} from "../controllers/classAllocationController.js";

const router = express.Router();

router.post("/", createAllocation);
router.get("/", getAllocations);
router.delete("/:id", deleteAllocation);

export default router;