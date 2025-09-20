const { default: slugify } = require("slugify");
const { User } = require("../models/user.js");
const {
  generateSecureUniqueId,
  idForSlug,
} = require("../utils/idGenerator.js");
const {
  createMessage,
  errorMessage,
  deleteMessage,
} = require("../utils/infoMessage.js");

exports.listUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.singleUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const dataBody = {
      slug: slugify(req.body.title_en, { lower: true }) + "-" + idForSlug(),
      ...req.body,
    };
    const user = await User.create(dataBody);
    res.status(201).json(createMessage("User", user));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.editUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json(deleteMessage("User", user));
    } else {
      res.status(404).json(errorMessage("Not Found User"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(errorMessage("User", error.message));
  }
};
