const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  team: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfJoining: { type: Date, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema);