

const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const wishlistSchema = mongoose.Schema(
  {
    user: String,
    products:Array
  },
  { timestamps: true }
);

const validateWishlist = (wishlist)=>{
  const schema = new Joi.object({
    user:Joi.string(),
    products:Joi.array()
  })
  return schema.validate(wishlist);
}

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = { Wishlist,validateWishlist };
