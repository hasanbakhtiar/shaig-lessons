const express = require("express");
const app = express();
require("dotenv").config();

//middleware start
const cors = require("cors");
const sequelize = require("./config/sequelize");
app.use(express.json());
app.use(cors());

app.use("/createAllData", (req, res) => {
  async function sync() {
    await Product.sync({ force: true });
    console.log("Product was created");

    await Category.sync({ force: true });
    console.log("Category was created");

    await GeneralInfo.sync({ force: true });
    console.log("GeneralInfo was created");

    await User.sync({ force: true });
    console.log("User was created");
  }
  Product.belongsTo(Category, {
    foreignKey: {
      allowNull: true,
    },
  });
  Category.hasMany(Product);

  sync();

  res.status(200).json({ message: "All datas were created" });
});

//Surface Endpoint start
const surfaceRoute = require("./routers/client/surface.js");
app.use("/api/v1", surfaceRoute);

const adminUrl = "/api/v1/ad";
const productRoute = require("./routers/admin/product.js");
const { Category } = require("./models/category.js");
const { GeneralInfo } = require("./models/generalinfo.js");
const { Product } = require("./models/product.js");
const { User } = require("./models/user.js");
app.use(`${adminUrl}/product`, productRoute);

const cookieParser = require("cookie-parser");
app.use(cookieParser());
//App Start
app.use("/", (req, res) => {
  res.cookie("data", 1);
  res.status(200).send("App Start");
});

//Sequelize Start
async () => {
  // await sequelize.sync({ force: true });
};

//Server Start
app.listen(process.env.PORT, () => {
  console.log(`Express server is running on port ${process.env.PORT}`);
});
