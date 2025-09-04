const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const isSuccess = await bcrypt.compare(req.body.password, user.password);
    if (isSuccess) {
      res.status(200).json({ message: 'Login is successfully', data: user });
    } else {
      res.status(403).send('Email or password is wrong!');
    }
  } else {
    res.status(404).send('This user is not existed');
  }
};
