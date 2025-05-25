const Admin = require('../models/Admin');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// === Admin Controllers ===

// Create Admin (register)
const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let admin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (admin) return res.status(400).json({ msg: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ username, email, password: hashedPassword });
    await admin.save();

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ msg: 'Admin created', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login Admin (username-based)
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ msg: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all admins (without passwords)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get admin by ID (without password)
const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update admin
const updateAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });

    if (username) admin.username = username;
    if (email) admin.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.json({ msg: 'Admin updated' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    res.json({ msg: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// === Student Controllers ===

// Create student
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ msg: 'Student created', student });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Student updated', student });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
