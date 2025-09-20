const { default: slugify } = require("slugify");
const { GeneralInfo } = require("../models/generalinfo.js");
const {
  generateSecureUniqueId,
  idForSlug,
} = require("../utils/idGenerator.js");
const {
  createMessage,
  errorMessage,
  deleteMessage,
} = require("../utils/infoMessage.js");

exports.listGeneralInfo = async (req, res) => {
  try {
    const generalinfo = await GeneralInfo.findByPk("1");
    res.status(200).json(generalinfo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createGeneralInfo = async (req, res) => {
  console.log(req);

  try {
    if (!req.file) {
      const dataBody = {
        SKU: generateSecureUniqueId(),
        slug: slugify(req.body.title_en, { lower: true }) + "-" + idForSlug(),
        ...req.body,
      };
      const generalinfo = await GeneralInfo.create(dataBody);
      res.status(201).json(createMessage("GeneralInfo", generalinfo));
    } else {
      const dataBody = {
        SKU: generateSecureUniqueId(),
        slug: slugify(req.body.title_en, { lower: true }) + "-" + idForSlug(),
        thumbnail: req.file.path,
        ...req.body,
      };
      const generalinfo = await GeneralInfo.create(dataBody);
      res.status(201).json(createMessage("GeneralInfo", generalinfo));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.editGeneralInfo = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteSingleGeneralInfo = async (req, res) => {
  try {
    const generalinfo = await GeneralInfo.findByPk(req.params.id);
    if (generalinfo) {
      await generalinfo.destroy();
      res.status(200).json(deleteMessage("GeneralInfo", generalinfo));
    } else {
      res.status(404).json(errorMessage("Not Found GeneralInfo"));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(errorMessage("GeneralInfo", error.message));
  }
};
