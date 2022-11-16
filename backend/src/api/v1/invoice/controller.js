const Invoice = require("../../../databases/models/Invoice");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

exports.createInvoice = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const totalAmount = Number(req.body.hoursOfWork) * Number(req.body.rate);

    const create = await Invoice.create({
      ...req.body,
      owner: req.user.id,
      totalAmount,
    });
    return res
      .status(201)
      .json({ data: create, message: "Invoice created successfully" });
  } catch (error) {
    return next(error);
  }
};

exports.getAllInvoice = async (req, res, next) => {
  try {
    const { status } = req.query;

    const where = {
      [Op.and]: [{ owner: req.user.id }, status ? { status } : {}],
    };
    const find = await Invoice.findAll({ where });

    return res.json({ data: find });
  } catch (error) {
    return next(error);
  }
};
