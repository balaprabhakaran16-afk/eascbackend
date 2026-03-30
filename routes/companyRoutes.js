import express from "express";
import upload from "../middleware/upload.js";

import {
createCompany,
getAllCompanies,
deleteCompany,
applyToCompany,
updateApplicationStatus,
getStudentApplications,
getAllApplications
} from "../controllers/companyController.js";

const router = express.Router();

/* ==============================
   ADMIN
============================== */

/* CREATE COMPANY */
router.post("/", createCompany);

/* DELETE COMPANY */
router.delete("/:id", deleteCompany);


/* ==============================
   PUBLIC / STUDENT
============================== */

/* GET ALL COMPANIES */
router.get("/", getAllCompanies);

/* APPLY TO COMPANY */
router.post("/apply", upload.single("resume"), applyToCompany);

/* GET STUDENT APPLICATIONS */
router.get("/student/:studentId", getStudentApplications);


/* ==============================
   STAFF
============================== */

/* GET ALL APPLICATIONS */
router.get("/applications", getAllApplications);

/* UPDATE STATUS */
router.put("/application/:id", updateApplicationStatus);

export default router;