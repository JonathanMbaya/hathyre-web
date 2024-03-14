const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    promo: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    likes: {
      type: [String]
    },

    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('product', productSchema);
module.exports = Product;

