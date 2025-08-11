const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const productSchema = mongoose.Schema(
  {
    title: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    description: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const productValidate = (product) => {
  const schema = new Joi.object({
    title: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    description: Joi.string(),
    active: Joi.boolean(),
  });
  return schema.validate(product);
};

const Product = mongoose.model('Product', productSchema);
module.exports = { Product, productValidate };
