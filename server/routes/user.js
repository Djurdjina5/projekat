const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const router = express.Router();
const userController = require("../controllers/usersController");

router.post('/login',userController.login);
router.post('/logout',userController.logout);
router.post('/register',userController.registration);
router.post('/changePassword',userController.changepassword);
router.post('/deleteAcc',userController.deleteAcc);
module.exports = router;