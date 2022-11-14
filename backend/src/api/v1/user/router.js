const express = require("express");
const { signup, login } = require("./controller");
const { body } = require("express-validator");
const User = require("../../../databases/models/User");

const route = express.Router();

const signupRules = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (value) => {
      const findEmail = await User.findOne({ where: { email: value } });
      if (findEmail) {
        throw new Error("Email already exists");
      }

      return true;
    }),
  body("username")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Username is required"),
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must be more than 3 characters"),
];
route.post("/", signupRules, signup);

// login
const loginRules = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Password is required"),
];
route.post("/login", loginRules, login);

module.exports = route;
