const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('product', productSchema);
module.exports = Product;
