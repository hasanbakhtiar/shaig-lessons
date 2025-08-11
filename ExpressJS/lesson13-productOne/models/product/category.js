
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    title: String,
  },
  { timestamps: true }
);

const validateCategory = (category)=>{
  const schema = new Joi.object({
    title:Joi.string()
  })
  return schema.validate(category);
}

const Category = mongoose.model('Category', categorySchema);
module.exports = { Category,validateCategory };
