
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const { validationResult } = require('express-validator')
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, phone, password, role } =
      req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hashedpassword = await bcrypt.hash(password, 11);
    console.log(hashedpassword);
    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedpassword,
      role,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {


  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user doesn't exsist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, usertype: user.role },
      process.env.SECRET
    );
    console.log(token);
    req.session.token = token;
    res.status(200).json({ message: "Login successful", token, useremail: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logOutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err.message })
    }
    res.status(200).json({ message: "Logout successful" });

  });
}