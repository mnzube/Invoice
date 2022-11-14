const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const User = require("./User");

const Invoice = sequelize.define(
  "Invoice",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.BIGINT,
    },
    status: {
      type: DataTypes.STRING,
    },
    hoursOfWork: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { tableName: "invoice", timestamps: true }
);

Invoice.belongsTo(User, { foreignKey: "owner" });
User.hasMany(Invoice);

module.exports = Invoice;
