import Application from "../models/Application.js";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import Staff from "../models/Staff.js";
import Company from "../models/Company.js";

/* ===============================
   APPLY COMPANY
================================ */

export const applyCompany = async (req, res) => {
  try {

    const { studentId, companyId } = req.body;

    const attendance = await Attendance.findOne({ student: studentId });

    if (!attendance || attendance.percentage < 75) {
      return res.status(400).json({
        message: "Attendance below 75%",
      });
    }

    const alreadyApplied = await Application.findOne({
      student: studentId,
      company: companyId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already Applied",
      });
    }

    const newApplication = await Application.create({
      student: studentId,
      company: companyId,
    });

    res.status(200).json({
      message: "Application Successful",
      application: newApplication,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL APPLICATIONS (ADMIN)
================================ */

export const getAllApplications = async (req,res)=>{

const apps = await Application.find()
.populate("student","name email")
.populate("company","name")

res.json(apps)

}

/* ===============================
   UPDATE STATUS
================================ */

export const updateStatus = async(req,res)=>{

const {status} = req.body

const app = await Application.findByIdAndUpdate(
req.params.id,
{status},
{new:true}
)

res.json(app)

}

/* ===============================
   STUDENT APPLICATIONS
================================ */

export const getStudentApplications = async(req,res)=>{

const apps = await Application.find({
student:req.params.id
}).populate("company","name")

res.json(apps)

}

/* ===============================
   ADMIN DASHBOARD STATS
================================ */

export const getAdminStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const staff = await Staff.countDocuments();
    const companies = await Company.countDocuments();
    const applications = await Application.countDocuments();

    res.json({
      students,
      staff,
      companies,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching admin stats",
    });
  }
};