const jwt = require("jsonwebtoken");
const User = require("../../../databases/models/User");

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization" || "Authorization"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    const findUser = await User.findOne({ where: { id: verify.id } });

    if (!findUser) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    req.user = findUser;

    return next();
  } catch (error) {
    return next(error);
  }
};
