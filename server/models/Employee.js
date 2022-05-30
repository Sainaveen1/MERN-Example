const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
