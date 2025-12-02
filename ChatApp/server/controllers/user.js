const { User } = require("../models/user");


exports.listUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.listSingleUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);

  }

}

exports.createUser = async (req, res) => {
  try {
    const dataBody = {
      ...req.body,
    };
    const user = await User.create(dataBody);
    res.status(201).json(user);
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
      res.status(200).json(user);
    } else {
      res.status(404).send("Not Found user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};