const express = require("express");
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getEmployees, verifyToken).post(createEmployee);
router.route("/:id").put(updateEmployee).delete(deleteEmployee);

module.exports = router;
