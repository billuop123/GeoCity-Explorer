import express from "express";
import authController from "../Controllers/authController.js";

const router = express.Router();

// User registration
router.route("/signup").post(authController.signup);

// User login
router.route("/login").post(authController.login);

// Forgot password
router
  .route("/forgotpassword")
  .post(authController.protect, authController.forgotPassword);

// Reset password
router
  .route("/resetpassword/:token")
  .post(authController.protect, authController.resetPassword);
router.route("/addPlace").post(authController.addNew);
router.route("/fetchCities").post(authController.fetchCities);
router.route("/deleteplace").post(authController.deletePlace);
// User logout

router.route("/logout").get(authController.protect, authController.logOut);

// Export the router
export default router;
