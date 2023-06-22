import express from "express";
import {
  registerController,
  loginController,
  testController,
  isAdmin,
  forgotPasswordController,
  isUser,
  editProfileController,
  orderListController,
  orderListAdminController,
  orderStatusController,
} from "../controller/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protect user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});
// protect login page
router.get("/login-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

// protect Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

// FORGOT PASSWORD
router.post("/forgot-password", forgotPasswordController);

//edit prodfile
router.put("/profile", requireSignIn, editProfileController);

// order list
router.get("/orders", requireSignIn, orderListController);

// order admin
router.get("/admin-orders", requireSignIn, isAdmin, orderListAdminController);

// order status update
router.put(
  "/orders-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
