const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Create a new student
exports.createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, age, course, password } = req.body;

  try {
    // Check if email already exists
    let existingStudent = await Student.findOne({ email });
    if (existingStudent)
      return res.status(400).json({ msg: 'Email already registered' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      age,
      course,
      password: hashedPassword,
    });

    await newStudent.save();

    // Don’t send password back!
    const studentToReturn = newStudent.toObject();
    delete studentToReturn.password;

    res.status(201).json({ msg: 'Student created', student: studentToReturn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all students (without passwords)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (!student) return res.status(404).json({ msg: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  const updates = { ...req.body };

  try {
    // If password needs update, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!updatedStudent) return res.status(404).json({ msg: 'Student not found' });

    res.json({ msg: 'Student updated', student: updatedStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ msg: 'Student not found' });
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
