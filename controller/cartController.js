const cart = require("../model/cart");
const productModel = require("../model/product");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../model/user");

exports.addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const { quantity } = req.body;
    const { productId } = req.params;
    const product = await productModel.findById(productId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const cartItem = await cart.create({
      userId: user._id,
      productId: product._id,
      productName: product.productName,
      price: product.price,
      quantity,
      total: product.price * quantity
    });

    res.status(201).json({
      message: "Item added to cart",
      cartItem,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: "Error adding item to cart",
      error,
    });
  }
};
