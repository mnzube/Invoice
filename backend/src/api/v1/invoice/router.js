const express = require("express");
const { createInvoice } = require("./controller");

const route = express.Router();

route.post("/", createInvoice);

module.exports = route;
