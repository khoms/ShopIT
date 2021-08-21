const Product = require("../model/product");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

//Get all products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
    count: products.length,
  });
};

//Get single product
exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

//Update products

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

//Delete products

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.remove();

  res.status(200).json({
    success: true,
    message: "Product is successfully dleted",
  });
};
