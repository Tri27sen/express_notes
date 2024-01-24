const express = require('express');
const { registerUser } = require('../controllers/user.controller.js');
const { model: asyncHandler } = require('../utils/asyncHandler');
const { upload } = require('../middleware/multer.middleware.js');
const router = express.Router();

console.log("Setting up user registration route...");

router.route('/register').post(
  upload.fields([
    { name: 'avator', maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  
  asyncHandler(registerUser) // Assuming registerUser is an asynchronous function
);

console.log("User registration route set up successfully.");

module.exports = router;
