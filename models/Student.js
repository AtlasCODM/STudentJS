const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, required: true, min: 0 },
  course: { type: String, required: true },
  password: { type: String, required: true }, // hashed
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

