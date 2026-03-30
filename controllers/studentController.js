import Student from "../models/Student.js";
import Application from "../models/Application.js";


// CREATE STUDENT
export const createStudent = async (req, res) => {

  try {

    const student = await Student.create(req.body);

    res.status(201).json(student);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// GET STUDENT PROFILE WITH APPLICATIONS
export const getStudentProfile = async (req, res) => {

  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const applications = await Application
      .find({ student: req.params.id })
      .populate("company");

    res.json({
      student,
      applications
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// UPDATE STUDENT
export const updateStudent = async (req, res) => {

  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(student);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};



// DELETE STUDENT
export const deleteStudent = async (req, res) => {

  try {

    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Student deleted"
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};