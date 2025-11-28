const { Message } = require("../models/message");


exports.listMessage = async (req, res) => {
  try {
    const message = await Message.findAll();
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.listSingleMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    console.log(error);

  }

}

exports.createMessage = async (req, res) => {
  try {
    const dataBody = {
      ...req.body,
    };
    const message = await Message.create(dataBody);
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


exports.deleteSingleMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message) {
      await message.destroy();
      res.status(200).json(message);
    } else {
      res.status(404).send("Not Found message");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};