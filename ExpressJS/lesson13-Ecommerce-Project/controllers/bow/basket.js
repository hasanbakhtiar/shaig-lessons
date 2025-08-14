const { Basket } = require('../../models/bow/basket');

exports.basketDataForUser = async (req, res) => {
  let basket = await Basket.find({ user: req.params.userid }).populate(
    'user products.list.product'
  );
  res.status(200).json({
    dataLength: basket.length,
    data: basket,
  });
};

exports.updateBasket = async (req, res) => {
  const basket = await Basket.findOneAndUpdate(
    { user: req.params.userid },
    {
      ...req.body,
    }
  );
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
