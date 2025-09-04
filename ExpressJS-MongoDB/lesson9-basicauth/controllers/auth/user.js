const { User, validateUser } = require('../../models/user');
const bcrypt = require('bcrypt');
exports.listUser = async (req, res) => {
  let user;
  if (req.query.user) {
    user = await User.find({ user: req.query.user });
  } else {
    user = await User.find();
  }
  res.status(200).json({
    dataLength: user.length,
    data: user,
  });
};

exports.createUser = async (req, res) => {
  const { error } = validateUser(req.body);
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
        res.status(200).json({
          statusMessage: 'Created',
          data: result,
        });
      }
    }
  }
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  if (!user) {
    res.status(404).json({
      statusMessage: 'This user not found',
    });
  } else {
    res.status(200).json({
      statusMessage: 'User was updated!',
      data: user,
    });
  }
};

exports.deleteUser = async (req, res) => {
  if (req.params.id === '688b83556aea4fd17ac76b8e') {
    res.status(403).send('No permission');
  } else {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({
        statusMessage: 'This user not found',
      });
    } else {
      res.status(200).json({
        statusMessage: 'Deleted',
        data: user,
      });
    }
  }
};
