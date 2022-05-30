var express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

var app = express();

connectDB();
app.use(express.json());

const employees = require("./routes/employee");
const auth = require("./routes/auth");
const verifyToken = require("./middleware/auth");

app.use("/api/auth", auth);
// app.use(verifyToken);
app.use("/api/employees", employees);
const PORT = process.env.PORT || 8081;

app.listen(
  8081,
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on PORT=${PORT}`
  )
);
