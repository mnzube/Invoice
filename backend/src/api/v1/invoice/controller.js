const Invoice = require('../../../databases/models/Invoice');

exports.createInvoice = (req, res, next) => {
  try {
    return res.json("welcome");
  } catch (error) {
    return next(error);
  }
};
