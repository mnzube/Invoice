const express = require("express");
const invoice = require("./invoice/router");
const user = require("./user/router");

const router = express.Router();

router.use("/api/v1/invoice", invoice);

router.use("/api/v1/user", user);

module.exports = router;
