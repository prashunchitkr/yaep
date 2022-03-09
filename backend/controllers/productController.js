import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/*
 * @desc   Fetch all products
 * @route  GET /api/products
 * @access Public
 */
export const getProducts = expressAsyncHandler(async (_req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/*
 * @desc   Fetch single products
 * @route  GET /api/products/:id
 * @access Public
 */
export const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

/*
 * @desc   Delete product
 * @route  DELETE /api/products/:id
 * @access Protected/Admin
 */
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

/*
 * @desc   Create a Product
 * @route  POST /api/products
 * @access Protected/Admin
 */
export const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

/*
 * @desc   Update a Product
 * @route  PUT /api/products/:id
 * @access Protected/Admin
 */
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
