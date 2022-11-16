const User = require("../../../databases/models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const c = await User.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password),
    });

    return res.status(201).json({ data: c, message: "Account Created" });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const checkUser = await User.findOne({ where: { email: req.body.email } });

    if (!checkUser) {
      return res.status(401).json({ message: "Wrong Credentials" });
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      checkUser.password
    );

    if (!checkPassword) {
      return res.status(401).json({ message: "Wrong Credentials" });
    }

    // avoid password to be returned in the response
    checkUser.setDataValue("password", undefined);

    const token = jwt.sign({ id: checkUser.id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    return res.json({ data: checkUser, token });
  } catch (error) {
    return next(error);
  }
};
