import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {

try {

const { name, email, password, role, rollNo, department } = req.body;

const userExists = await User.findOne({ email });

if (userExists) {
return res.status(400).json({
message: "User already exists"
});
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
name,
email,
password: hashedPassword,
role,
department
});

// IF STUDENT CREATE STUDENT RECORD
if (role === "student") {

const student = await Student.create({
name,
email,
rollNo,
department
});

return res.status(201).json({
message: "Student Registered Successfully",
user,
studentId: student._id
});
}

res.status(201).json({
message: "User Registered Successfully",
user
});

} catch (error) {

console.log(error);

res.status(500).json({
message: "Server Error"
});

}

};



// LOGIN
export const login = async (req, res) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({
message: "Invalid Email"
});
}

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
return res.status(400).json({
message: "Invalid Password"
});
}

const token = jwt.sign(
{ id: user._id, role: user.role },
"secretkey",
{ expiresIn: "1d" }
);

// FIND STUDENT
const student = await Student.findOne({ email });

res.json({
token,
role: user.role,
userId: user._id,
studentId: student?._id
});

} catch (error) {

console.log(error);

res.status(500).json({
message: "Server Error"
});

}

};