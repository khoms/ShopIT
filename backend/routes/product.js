const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/product").get(getProducts);

router.route("/product/:id").get(getProduct);

router.route("/admin/product").post(createProduct);

router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
module.exports = router;
