const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const studentController = require('../controllers/studentController');

router.use(authMiddleware); // Protect all routes below

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
