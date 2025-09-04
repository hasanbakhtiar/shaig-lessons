const { Order } = require('../../models/order/order');
const { User } = require('../../models/auth/user');
const {sendMailForOrder} = require('../../utils/sendMailer');
exports.orderDataForUser = async (req, res) => {
  let order = await Order.find({ user: req.params.userid })
    .populate('user')
    .populate({
      path: 'basket',
      populate: {
        path: 'products.product', 
        model: 'Product',
      },
    });

  res.status(200).json({
    dataLength: order.length,
    data: order,
  });
};

exports.createOrder = async (req, res) => {
  const user = await User.findById(req.params.userid);

  if (!user) {
    res.status(404).json({
      statusMessage: 'This order not found',
    });
  } else {
    const order = new Order(req.body);
    sendMailForOrder(user.fullname,user.email,order);

    order.save();
    res.status(200).json({
      statusMessage: 'Order is created!',
      data: order,
    });
  }
};
