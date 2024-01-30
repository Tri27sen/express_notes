
const mongoose = require('mongoose')
const { Schema } = mongoose
const subcriptionSchema = new Schema({
    subscriber :{
      type: Schema.Types.ObjectId , 
      ref:"User"
    },
    channel : {
      type:  Schema.Types.ObjectId ,
      ref : "User"
    }
  },
    {
      timestaps : true
  }
)

const Subcription = mongoose.model("Subcription",subcriptionSchema)
module.exports = Subcription; 