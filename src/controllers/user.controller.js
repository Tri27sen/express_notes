const { model: asyncHandler } = require("../utils/asyncHandler.js");
const ApiError = require('../utils/apierror.js')
const User = require('../models/user.model.js')
const uploadOnCloudiary = require('../utils/cloudinary.js')

const ApiResponse = require('../utils/apiResponse.js')

 const registerUser = asyncHandler(async (req,res) =>{
   
  const {username , email , fullName ,password } = req.body
  console.log(username , email , fullName )
  /*
  if(fullName === "" ){
    throw new ApiError(400,"fullname is required ")*/if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
  throw new ApiError(400, "All fields are required");
}
 
//username
 const exsisteduser = await User.findOne({
  $or: [{username},{email}]
 })
  
 if(exsisteduser)
 {
  throw new ApiError(409 , "user already exsists ...")
 }
console.log("finding avator and cover image path -------------")
//console.log(req.files)
 const avatorlocalpath =req.files?.avator[0]?.path
 console.log(avatorlocalpath) ;
 let coverImagepath ;
 if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
  coverImagepath = req.files.coverImage[0].path
 }
 console.log(coverImagepath)


 if(!avatorlocalpath)
 {
    throw new ApiError(400 , "avator file is required ")
 }

const avator =  await uploadOnCloudiary(avatorlocalpath)
const coverImage = await uploadOnCloudiary(coverImagepath)

if(!avatorlocalpath)
 {
    throw new ApiError(400 , "avator file is required ")
 }


const user = await User.create({
  fullName,
  avator:avator.url,
  coverImage: coverImage?.url || "",
  email , 
  password,
  username : username.toLowerCase()
})

const createduser = await User.findById(user._id).select(
  "-password -refreshToken" // bydefault all are selected 
)
if(!createduser){
  throw new ApiError(500 , "user has not created ...")
}

console.log(createduser)
console.log("user.controller.js ....")
console.log("asynchandler used ...")
return res.status(201).json(
  new ApiResponse(200,createduser,"user registeration done... satori gojo wins ...:)")
)
 }
  )
module.exports ={registerUser} //module.exports =s


/*if (
  [fullName , email , username , password ].some((field) => field?.trim() === "")
  ]{
    throw new ApiError(400,"All field are required")
  }
)

*/