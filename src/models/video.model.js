//id , videoFile , thumbnail , owner , title , description , duration , views , ispublished , createdAt , UpdatedAt
const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const videoSchema = new Schema(
  {
    videoFile:{
      type : String , 
      required : true 
    },
    thumbnail:{
      type : String , 
      required : true 
    },
    title:{
      type : String , 
      required : true 
    },
    duration:{
      type : Number , 
      required : true 
    },
    views:{
      type:Number ,
      defaults:0
    },
    isPublished:{
      type : Boolean ,
      default : true 
    },
    owner:{
      type : Schema.Types.ObjectId ,
      ref : Users 
    },
  },
  {
    timestamps : true 
  }
)

videoSchema.plugin(mongooseAggregatePaginate)
const video = mongoose.model("video",videoSchema)
module.exports = video //module.exports = app 