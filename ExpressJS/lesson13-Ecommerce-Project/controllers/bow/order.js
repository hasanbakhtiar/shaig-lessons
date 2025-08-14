const { Order } = require('../../models/bow/order');
const { User } = require('../../models/auth/user');

exports.orderDataForUser = async (req, res) => {
  // let order = await Order.find({ user: req.params.userid }).populate('user basket basket.products.list.product');
  let order = await Order.find({ user: req.params.userid })
    .populate('user')
    .populate({
      path: 'basket',
      populate: {
        path: 'products.list.product', 
        model: 'Product',
      },
    });

  res.status(200).json({
    dataLength: order.length,
    data: order,
  });
};

exports.createOrder = async (req, res) => {
  const user = await User.find({ id: req.params.userid });
  if (!user) {
    res.status(404).json({
      statusMessage: 'This order not found',
    });
  } else {
    const order = new Order(req.body);

    order.save();
    res.status(200).json({
      statusMessage: 'Order is created!',
      data: order,
    });
  }
};
