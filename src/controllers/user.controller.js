const { model: asyncHandler } = require("../utils/asyncHandler.js");
const ApiError = require('../utils/apierror.js')
const User = require('../models/user.model.js')
const uploadOnCloudiary = require('../utils/cloudinary.js')
const ApiResponse = require('../utils/apiResponse.js');
//var  { options } = require("../routes/user.routes.js");
const cookie = require("cookie-parser")
const {verifyJWT} = require("../middleware/auth.middleware.js")

//User - mongodb model , user - findById(userId)
const generate_Access_Refresh_token = async (userId) => {
  try{
    console.log("generating access and refresh tokens")
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSve : false })
    console.log(accessToken, refreshToken)
    return {accessToken, refreshToken}
  }catch(error){
    throw new ApiError(500,"something went wrong while generating tokens ")
  }
}



 const registerUser = asyncHandler(async (req,res) =>{
   
  const {username , email , fullName ,password } = req.body
  console.log(username , email , fullName )
  /*
  if(fullName === "" ){
    throw new ApiError(400,"fullname is required ")*/
  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
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
console.log("finding avator and cover image path -------------") //console.log(req.files)
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
 }  )


/*
req body-> data 
access based on username or email 
find the user 
passwaord check 
acces and refresh token 
send cookies - refresh tokens 

*/



const loginUser = asyncHandler(async (req,res) =>{
   
  const {username , email , fullName ,password } =   req.body
  console.log(req.body )
  console.log(email , username , password)
  if(!(username &&  email)){

    throw new ApiError(400 , " email or username is required")
  }
  const user = await User.findOne({
    $or :[{username} , {email}]
  })
  console.log(user)
if(!user){
  throw new ApiError(404 , "User not found ")
}
const ispasswordvalid = await user.isPasswordCorrect(password) 
console.log("password is")
console.log(ispasswordvalid)
if (!ispasswordvalid){
  throw new ApiError(401 , "password incorrect ")
}


const {accessToken, refreshToken} = await generate_Access_Refresh_token(user._id)
const logged_in_User = await User.findById(user._id).select("-password -refreshToken")

//cookies can be modified from the front as well , to allow only server modification use httpOnly 
const  options ={
  httpOnly : true ,
  secure : true 
}
  return res
  .status(200)
  .cookie("accessToken",accessToken , options)
  .cookie("refreshToken",refreshToken , options)
  .json(
    new ApiResponse(
      200 ,
      {
        user:logged_in_User,accessToken,refreshToken
      },
      "user logged in successfully ... itachi uchhiha lives :> "
    )
  )
}
)





//remove cookies  , middleware 
const logoutuser = asyncHandler(async(req , res) =>{
  //req.user._id
  console.log("triggered logout -----")
  const logoutdetails = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set :{
        refreshToken:undefined
      }
    },
    {
      new: true // sets the new conditions 
    }
  )
 const options ={
    httpOnly : true ,
    secure : true 
  }
  return res
  .status(200)
  .clearCookie("accessToken" , options)
  .clearCookie("refreshToken" , options)
  .json({ message: "Logout successful" });
})

const refreshAccessToken = asyncHandler( async ( req , res)=>{
  const incomingRefreshtoken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request")
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken , 
      process.env.ACCESS_TOKEN_SECRET
    )
    const user = await User.findById(decodedToken?._id)
    if (!user) {
      throw new ApiError(401, "Invalid refresh token")
  }

  if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used")

  }

  const options = {
      httpOnly: true,
      secure: true
  }

  const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id).status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", newRefreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {accessToken, refreshToken: newRefreshToken},
          "Access token refreshed"
      )
  )
} catch (error) {
  throw new ApiError(401, error?.message || "Invalid refresh token")
}

})
 
module.exports ={registerUser , loginUser , logoutuser, refreshAccessToken} //module.exports =s





/*if (
  [fullName , email , username , password ].some((field) => field?.trim() === "")
  ]{
    throw new ApiError(400,"All field are required")
  }
)

*/