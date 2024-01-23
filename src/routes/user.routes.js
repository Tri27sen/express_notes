const express = require('express');
// dealing with user realated 
const { registerUser } = require('../controllers/user.controller.js');
const { model: asyncHandler } = require("../utils/asyncHandler");
const {upload} = require('../middleware/multer.middleware.js')
const router = express.Router();
console.log("post using router ....")
router.route('/register').post(
  upload.fields([
    {
      name: "avatar",
      maxCount : 1 
    } ,
    {
      name:"coverImage",
      maxCount:1
    }
  ]),
  registerUser); //user/register

console.log("register user done .....")
console.log("user.routes done")
module.exports = router ; 