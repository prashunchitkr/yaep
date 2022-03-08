import express from "express";

import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProductById,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default router;
