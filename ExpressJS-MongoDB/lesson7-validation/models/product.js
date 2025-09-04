const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productID: String,
    slug: String,
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
    productID: Joi.string(),
    slug: Joi.string(),
    title: Joi.string().required().min(2).max(20).messages({
      'string.min':'2 simvoldan artiq olmalidir',
      'string.max':'20den artiq simvol qadagandir'
    }),
    price: Joi.number().required().messages({
      'any.required': 'Qiymet teyini mütləqdir.'
    }),
    category: Joi.string(),
    description: Joi.string().required(),
    active: Joi.boolean(),
  });
  return schema.validate(product);
};

const Product = mongoose.model('Product', productSchema);
module.exports = { Product, productValidate };
