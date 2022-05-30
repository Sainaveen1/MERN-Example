const Employee = require("../models/Employee");

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (err) {
    res.status(500);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    if (!employee) {
      return res.status(500);
    }
    res.status(201).json({ success: true, data: employee });
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(req.body);
    if (!employee) {
      return res.status(500);
    }
    res.status(200).json({ success: true, data: req.body });
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndDelete(req.body);
    if (!employee) {
      return res.status(500);
    }
    res.status(200).json({ success: true, data: employee });
  } catch (e) {
    res.status(500).json({ success: false, message: e });
  }
};
