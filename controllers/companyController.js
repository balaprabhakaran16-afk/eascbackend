import mongoose from "mongoose";
import Company from "../models/Company.js";
import Application from "../models/Application.js";

/* ==============================
   CREATE COMPANY (ADMIN)
============================== */
export const createCompany = async (req, res) => {
  try {

    const { companyName, role, eligibleDepartment } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({
        message: "Company Name and Role required"
      });
    }

    const newCompany = new Company({
      companyName,
      role,
      eligibleDepartment
    });

    await newCompany.save();

    res.status(201).json({
      message: "Company created successfully",
      company: newCompany
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error creating company"
    });

  }
};


/* ==============================
   GET ALL COMPANIES
============================== */
export const getAllCompanies = async (req, res) => {

  try {

    const companies = await Company.find().sort({ createdAt: -1 });

    res.json(companies);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching companies"
    });

  }

};


/* ==============================
   DELETE COMPANY (ADMIN)
============================== */
export const deleteCompany = async (req, res) => {

  try {

    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.json({
      message: "Company deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error deleting company"
    });

  }

};


/* ==============================
   APPLY TO COMPANY (STUDENT)
============================== */
export const applyToCompany = async (req, res) => {

  try {

    const {
      studentId,
      companyId,
      fullName,
      email,
      phone,
      department,
      cgpa,
      skills
    } = req.body;

    const resume = req.file ? req.file.path : "";

    if (!studentId || !companyId) {
      return res.status(400).json({
        message: "Student ID and Company ID required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: "Invalid Student ID"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid Company ID"
      });
    }

    /* Check already applied */

    const alreadyApplied = await Application.findOne({
      student: studentId,
      company: companyId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied to this company"
      });
    }

    const newApplication = new Application({
      student: studentId,
      company: companyId,
      fullName,
      email,
      phone,
      department,
      cgpa,
      skills,
      resume,
      status: "applied"
    });

    await newApplication.save();

    res.status(201).json({
      message: "Application Submitted 🎉",
      application: newApplication
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Application Failed"
    });

  }

};


/* ==============================
   GET STUDENT APPLICATIONS
============================== */
export const getStudentApplications = async (req, res) => {

  try {

    const { studentId } = req.params;

    const applications = await Application.find({
      student: studentId
    })
    .populate("company")
    .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching applications"
    });

  }

};


/* ==============================
   GET ALL APPLICATIONS (STAFF)
============================== */
export const getAllApplications = async (req, res) => {

  try {

    const applications = await Application.find()
      .populate("student")
      .populate("company")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching applications"
    });

  }

};


/* ==============================
   UPDATE APPLICATION STATUS
============================== */
export const updateApplicationStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json({
      message: "Application updated",
      application
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error updating application"
    });

  }

};