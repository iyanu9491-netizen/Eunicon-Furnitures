const express = require("express");
const router = express.Router();
const { addToCart } = require("../controller/cartController");
const { Authentication } = require('../middlewares/auth')

router.post("/add-to-cart/:productId", Authentication, addToCart);

module.exports = router;
