
const { Basket, validateBasket } = require('../../models/bow/basket');

exports.listBasket = async (req, res) => {
  let basket;
  if (req.query.basket) {
    basket = await Basket.find({ user:req.params.id }).populate('user ');
  } else {
    basket = await Basket.find();
  }
  res.status(200).json({
    dataLength: basket.length,
    data: basket,
  });
};

exports.createBasket = async (req, res) => {
  const { error } = validateBasket(req.body);
  if (error) {
    res.status(400).json({
      message: error.message,
    });
  } else {
    const basket = new Basket(req.body);
    const result = await basket.save();
    res.status(201).json({
      statusMessage: 'Created',
      data: result,
    });
  }
};

exports.updateBasket = async (req, res) => {
  const basket = await Basket.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  if (!basket) {
    res.status(404).json({
      statusMessage: 'This basket not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'Basket was updated!',
      data: basket,
    });
  }
};

exports.deleteBasket = async (req, res) => {
  const basket = await Basket.findByIdAndDelete(req.params.id);
  if (!basket) {
    res.status(404).json({
      statusMessage: 'This basket not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'Deleted',
      data: basket,
    });
  }
};
