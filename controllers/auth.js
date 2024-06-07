const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  try {
    const existingUsername = await User.findOne({
      username: username
    });
    if (existingUsername) {
      const error = new Error("A user with this username exists");
      error.statusCode = 401;
      throw error;
    }

    const existingEmail = await User.findOne({
      email: email
    });

    if (existingEmail) {
      const error = new Error("A user with this email exists");
      error.statusCode = 401;
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      username: username,
      superAdmin: false
    });

    const newUser = await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      const error = new Error("A user with this username could not be found");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong Username or Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      "verysecretToken",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
