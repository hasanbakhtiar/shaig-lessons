const { Category } = require("../models/category");
const { GeneralInfo } = require("../models/generalinfo");
const { Product } = require("../models/product");
const { User } = require("../models/user");

const migrationCall = () => {
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

  sync();
};

const realtionCall = async () => {
  Product.belongsTo(Category, {
    foreignKey: {
      allowNull: true,
    },
  });
  Category.hasMany(Product);
};

module.exports = { migrationCall, realtionCall };
