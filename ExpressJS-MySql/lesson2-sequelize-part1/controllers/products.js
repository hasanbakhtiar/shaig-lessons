const Products = require("../models/products");

exports.listProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const active = req.body.active;
    await Products.create({
      title: title,
      price: price,
      description: description,
      active: active,
    });
    res.send("Data was created");
  } catch (err) {
    res.send(err);
  }
};

exports.deleteSingleProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.send("data was deleted");
    } else {
      res.send("no found product");
    }
  } catch (error) {
    console.log(error);
  }
};
