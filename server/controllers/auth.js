const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    const data = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role,
    });
    const user = await User.create(data);
    return res.status(201).json({ success: true, data: { id: user._id } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log(user);
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );
    console.log(isPasswordValid);
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
