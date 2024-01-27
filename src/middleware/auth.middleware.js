//  the middleware makes the user information available to downstream middleware functions or route handlers. This is useful for implementing authorization checks, custom authentication logic, or any other operations that require access to the authenticated user's information. 



const ApiError = require("../utils/apierror")
const {model: asyncHandler }= require("../utils/asyncHandler")
const jwt = require("jsonwebtoken")
const User = require('../models/user.model.js')
/*

a)Token Extraction:
b)JWT Verification:The extracted token is then verified using jwt.verify with the secret key (process.env.ACCESS_TOKEN_SECRET).
c)User Retrieval:If the JWT is valid, the middleware attempts to find the user in the database based on the decoded token's _id
*/



const verifyJWT = asyncHandler(async ( req , res,next) => {
  try{
  const token = req.cookies?.accessToken  || req.header("authorization")?.replace("Bearer ","")

  if(!token){
    throw new ApiError(401 , "Unthorized request ")
  }

const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
if(!user){
  throw new ApiError(401 , "invalid access token ")
}
req.user = user ;

console.log("request body ---------------------------")
//console.log(req.user)
next()
  }
  catch (error){
    throw new ApiError(401 , error?.message || " invalid access token ")
  }
}) 


module.exports = { verifyJWT };