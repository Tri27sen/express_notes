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

exports.userSchema=mongoose.model('User',userSchema)