const { model: asyncHandler } = require("../utils/asyncHandler.js");
const {ApiError} = require('../utils/apierror.js')
const User = require('../models/user.model.js')
const uploadOnCloudiary = require('../utils/cloudinary.js')



 const registerUser = asyncHandler(async (req,res) =>{
   res.status(200).json({
    message: "gojo satori rules :>"
  })

  const {username , email , fullName ,password } = req.body
  console.log(username , email , fullName )
  /*
  if(fullName === "" ){
    throw new ApiError(400,"fullname is required ")*/if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
  throw new ApiError(400, "All fields are required");
}
 
//username
 const exsisteduser = User.findOne({
  $or:[{username},{email}]
 })
  
 if(exsisteduser)
 {
  throw new ApiError(409 , "user already exsists ...")
 }

 const avatorlocalpath =req.files?.avatar[0]?.path
 console.log(avatorlocalpath)
 const coverImagepath = req.files?.coverImage[0]?.path 
 console.log(coverImagepath)



 if(!avatarLocalpath)
 {
    throw new ApiError(400 , "avator file is required ")
 }

const avator =  await uploadOnCloudiary (avatorlocalpath)
const coverImage = await uploadOnCloudiary(coverImagepath)

if(!avatarLocalpath)
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
console.log("user.controller.js ....")
console.log("asynchandler used ...")
return res.staus(201).json(
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