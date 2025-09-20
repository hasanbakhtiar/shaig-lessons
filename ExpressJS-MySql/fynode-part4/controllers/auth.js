const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");
const {
  createMessage,
  errorMessage,
  deleteMessage,
} = require("../utils/infoMessage.js");
const {
  loginValidate,
  registerValidate,
} = require("../models/validation/auth.js");

exports.singleAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginValidate(req.body);
    if (error) {
      res.status(400).json(errorMessage("no permission", error));
    }
    const user = await User.findOne({ where: { email: req.body.email } });

    const token = user.createAuthToken();

    res.status(200).header("x-auth-token", token).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.register = async (req, res) => {
  try {
    const { error } = registerValidate(req.body);
    if (error) {
      res.status(400).json(errorMessage("no permission", error));
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const dataBody = {
      ...req.body,
      password: hashPassword,
      role: "user",
    };
    const user = await User.create(dataBody);
    res.status(201).json(createMessage("User", user));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.deleteAccount = async (req, res) => {
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
