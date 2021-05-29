import express from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const router = express.Router();

/*
 * @desc   Fetch all products
 * @route  GET /api/products
 * @access Public
 */
router.get(
  "/",
  expressAsyncHandler(async (_req, res) => {
    const products = await Product.find();
    res.send(products);
  })
);

/*
 * @desc   Fetch single products
 * @route  GET /api/products/:id
 * @access Public
 */
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.send(product);
      }
    }
    res.status(404);
    throw new Error("Product not found");
  })
);

export default router;
