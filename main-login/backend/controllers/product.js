const { Product } = require("../models/product");

exports.listProduct = async (req, res) => {
    try {
        const product = await Product.findAll();
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.createProduct = async (req, res) => {
    try {
        const dataBody = {
            ...req.body,
        };
        const product = await Product.create(dataBody);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.status(200).json(product);
        } else {
            res.status(404).json(errorMessage("Not Found Product"));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}