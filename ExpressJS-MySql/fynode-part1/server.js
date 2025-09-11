const express = require("express");
const app = express();
require("dotenv").config();

//middleware start
const cors = require("cors");
const sequelize = require("./config/sequelize");
app.use(express.json());
app.use(cors());

//Surface Endpoint start
const surfaceRoute = require("./routers/client/surface.js");
app.use("/api/v1", surfaceRoute);

const adminUrl = "/api/v1/ad";
const productRoute = require("./routers/admin/product.js");
app.use(`${adminUrl}/product`, productRoute);

//App Start
app.use("/", (req, res) => {
  res.status(200).send("App Start");
});

//Sequelize Start
async () => {
  await sequelize.sync({ force: true });
};

//Server Start
app.listen(process.env.PORT, () => {
  console.log(`Express server is running on port ${process.env.PORT}`);
});
