const { Message } = require("../models/message");
const { Op } = require("sequelize");

exports.listMessageforUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const { currentUserId } = req.query;
    if (currentUserId) {
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { senderId: currentUserId, receiverId: userid },
            { senderId: userid, receiverId: currentUserId },
          ],
        },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(messages);
    } else {
      const messages = await Message.findAll({
        where: { receiverId: userid },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(messages);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

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
};

exports.createMessage = async (req, res) => {
  try {
    const { userid } = req.params; // receiverId
    const { message, senderId } = req.body;

    const newMessage = await Message.create({
      senderId,
      receiverId: userid,
      message,
    });

    res.status(201).json(newMessage);
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