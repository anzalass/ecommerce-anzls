import express from "express";
import { isAdmin } from "../controller/authController.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategory,
  singleCategory,
  updateCategoryController,
} from "../controller/categoryController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// CREATE CATEGORI
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// UPDATE CATEGORI
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// GET CATEGORI
router.get("/getall-category", getCategory);

// SINGLE CATEGORY
router.get("/single-category/:slug", singleCategory);

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
