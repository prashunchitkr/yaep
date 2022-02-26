import express from "express";
import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.route("/:id").delete(protect, admin, deleteUser)

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);

export default router;
