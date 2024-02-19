const Product = require("../models/product.model");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Ce produit n'existe pas" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.setProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
  }

}

module.exports.editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Ce produit n'existe pas" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Ce produit n'existe pas" });
    }
    res.status(200).json({ message: "Produit supprimé ref:" + req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.likeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.body.userId } },
      { new: true }
    );

    const likeCount = product.likes.length; // Obtenir le nombre de likes

    res.status(200).json({ product, likeCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.dislikeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );

    const dislikeCount = product.likes.length; // Obtenir le nombre total de dislikes après le retrait

    res.status(200).json({ product, dislikeCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

