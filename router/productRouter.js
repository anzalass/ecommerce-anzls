import express from "express";
import { isAdmin } from "../controller/authController.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getPhotoProduct,
  getPoductFilter,
  getProductByPenjual,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controller/productController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import productModel from "../models/productSchema.js";

const router = express.Router();

// router vvreate product

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get product tokomuu
// router.get("/your-products", getProductByPenjual);
router.get("/your-products", requireSignIn, isAdmin, getProductByPenjual);

// get  product
router.get("/get-product", getProductController);

// Single Product
router.get("/get-product/:slug", getSingleProductController);

//GET PHOTO
router.get("/product-photo/:pid", getPhotoProduct);

// DELETED PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

// FILTER PRODUCT
router.post("/products-filter", getPoductFilter);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

// smilliar product
router.get("/related-product/:pid/:cid", relatedProductController);

// category product lict
router.get("/product-category/:slug", productCategoryController);

//payments route
// token
router.get("/braintree/token", braintreeTokenController);

// paymenr braintree
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
