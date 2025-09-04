const {User} = require('../../models/auth/user');

exports.listAccountSingle = async (req, res) => {
  let user = await User.findOne({id:req.params.userid});
  if (!user) {
    res.status(404).json({
    message: "This user is not found.",
  });
  }
  res.status(200).json({
    data: user,
  });
};


