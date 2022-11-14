const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./databases");
const v1 = require("./api/v1");
const { config } = require("dotenv");
config();

const app = express();

const port = 4000;

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.use(v1);

app.use((error, _req, res, _next) => {
  console.log(error);
  return res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  // connect database
  sequelize.sync({ alter: true });
  console.log(`Server Started On Port ${port}`);
});
