const { User } = require('../../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const isSuccess = await bcrypt.compare(req.body.password, user.password);
    if (isSuccess) {
      const token = user.createAuthToken();
      res.status(200).header('x-auth-token',token).json({
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
