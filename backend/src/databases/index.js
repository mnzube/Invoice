const { Sequelize } = require("sequelize");
const { config } = require("dotenv");
config();

exports.sequelize = new Sequelize(process.env.DATABASE_URI);
