const express = require('express');
const { registerUser, logoutuser , loginUser , refreshAccessToken } = require('../controllers/user.controller.js');
const { model: asyncHandler } = require('../utils/asyncHandler');
const { upload } = require('../middleware/multer.middleware.js');
const {verifyJWT} = require('../middleware/auth.middleware.js')
const router = express.Router();
const app = express()
app.use(express.json());
console.log("Setting up user registration route...");

router.route('/register').post(
  upload.fields([
    { name: 'avator', maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  
  asyncHandler(registerUser)
  );
console.log("User registration route set up successfully.");


console.log("logged in  user ")


router.route("/login").post(asyncHandler(loginUser))
//secured routes 
console.log("logged out  user ")
router.route("/logout").post(verifyJWT , logoutuser)//more middlewares can be added 
console.log("refreshtoken")
router.route("/refresh-token").post(refreshAccessToken)
module.exports = router;
//ogoutuser