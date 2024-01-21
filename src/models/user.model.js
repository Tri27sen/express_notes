//id , watchHistory , username , email , fullName , avator , coverimage , password , refreshToken , createdAt , updatedAt 
//avator , coverimage - third party  - url given 


const mongoose = require('.mongoose')
const { Schema } = mongoose
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

  this.password = bcrypt.hash(this.password,10)
  next()
})//This middleware is set to run before the save_(event) operation on a userSchema
userSchema.methods.isPasswordCorrect = async function(password){
   return awaitbcrypt.compare(password, this.password)
}

exports.userSchema=mongoose.model('User',userSchema)