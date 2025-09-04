const {User} = require('../../models/user');

exports.accountInfo = async (req, res) => {
  let user = await User.findOne({id:req.params.id}); 
  res.status(200).json({
    data: user,
  });
};


