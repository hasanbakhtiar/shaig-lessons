
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    slug:String,
    title: String,
  },
  { timestamps: true }
);

const validateCategory = (category)=>{
  const schema = new Joi.object({
    slug:Joi.string(),
    title:Joi.string().required()
  })
  return schema.validate(category);
}

const Category = mongoose.model('Category', categorySchema);
module.exports = { Category,validateCategory };
