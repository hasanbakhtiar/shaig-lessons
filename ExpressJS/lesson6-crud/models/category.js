
const { default: mongoose } = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    slug:String,
    title: String,
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = { Category };
