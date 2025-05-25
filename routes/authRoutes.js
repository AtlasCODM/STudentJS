const express = require('express');
const router = express.Router();

const {
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
} = require('../controllers/authController');

// Admin routes
router.post('/admins', registerAdmin);
router.post('/admins/login', loginAdmin);
router.get('/admins', getAllAdmins);
router.get('/admins/:id', getAdminById);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

// Student routes
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;
