//id , watchHistory , username , email , fullName , avator , coverimage , password , refreshToken , createdAt , updatedAt 
//avator , coverimage - third party  - url given 


const mongoose = require('mongoose')
const { Schema } = mongoose
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
username:{
  type:String ,
  required:true,
  unique:true ,
  lowercase: true , 
  trim : true,
  index:true   
},
email:{
  type:String ,
  required:true,
  unique:true ,
  lowercase: true , 
  trim : true,
},
fullname:{
  type:String ,
  required:true,
  trim : true,
  index:true   
},
avator:{
  type:String, // cloud based url 
  required:true,
},
coverImage:{
  type:String , 
},
watchHistory :[{ // array 
type:Schema.Types.ObjectId,
ref:"Video"
}
],
password:{
  type:String ,
  required:[true , 'password is required']
},
refreshToken :{
  type:String
}
},{
  timestamps:true
})



// direct callbacks are not used becoz  , save event working on user 

userSchema.pre('save',async function(next) {
  if(!this.isModified('password')) return next();

  this.password =await bcrypt.hash(this.password,10)
  next()
})//This middleware is set to run before the save_(event) operation on a userSchema
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}


//encoding a set of claims (information about a user or another entity) into a string.
//const token = jwt.sign(payload, secretKey, options);
userSchema.methods.generateAccessToken = function(){
   const key = jwt.sign({
   _id:this._id,
   email:this.email,
   username:this.username,
   fullName:this.fullName
},
process.env.ACCESS_TOKEN_SECRET,
{
  expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)
return key 
}
userSchema.methods.generateRefreshToken = function()
{
  
  const key_refresh = jwt.sign(
{
  _id:this._id,
},
process.env.ACCESS_TOKEN_SECRET,
{
expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)
return key_refresh }

const User = mongoose.model("User",userSchema)
exports.model=User //