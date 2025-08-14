const { User } = require('../../models/auth/user');
const bcrypt = require('bcrypt');
const { Basket } = require('../../models/bow/basket');
const { registerValidate, loginValidate } = require('../../models/auth/auth');

exports.login = async (req, res) => {
  const { error } = registerValidate(req.body);
  if (error) {
    res.status(400).json({
      message: error.message,
    });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const isSuccess = await bcrypt.compare(req.body.password, user.password);
    if (isSuccess) {
      const token = user.createAuthToken();
      res
        .status(200)
        .header('x-auth-token', token)
        .json({
          message: 'Login is successfully',
          data: {
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
          },
        });
    } else {
      res.status(403).send('Email or password is wrong!');
    }
  } else {
    res.status(404).send('This user is not existed');
  }
};

exports.register = async (req, res) => {
  const { error } = registerValidate(req.body);
  if (error) {
    res.status(400).json({
      message: error.message,
    });
  } else {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      res.status(400).send('Already existed user.');
    } else {
      if (req.body.role === 'admin') {
        res.status(403).send('No permission');
      } else {
        const user = new User(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 9);
        user.password = hashPassword;
        const result = await user.save();

        const basket = new Basket({
          user: user._id,
          products: {
            list: [
              {
                quantity: 0,
                product: null,
              },
            ],
            totalAmount: 0,
          },
        });
        await basket.save();

        res.status(200).json({
          statusMessage: 'Created',
          data: result,
        });
      }
    }
  }
};
