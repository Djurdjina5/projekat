const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const router = express.Router();
const userController = require("../controllers/usersController");
const jwt_verify = require("./verify");

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/register", userController.registration);
router.post("/changePassword", jwt_verify.jwt_verify, userController.changepassword);
router.post("/deleteAcc", jwt_verify.jwt_verify, userController.deleteAcc);
router.post("/logout", jwt_verify.jwt_verify, userController.logout);
module.exports = router;
