//try ... catch
//promises
//database - continent ... asyn ...await 

//()() excute the function as soon as written

require('dotenv').config({path:'./env'})
const mongoose = require('mongoose')
const { app } = require('./app.js');
const db_name =require('./constants.js')
const express = require('express')

const connectdb=require('./db/index.js')


const { error } = require('console')
console.log("hello from index.js")
connectdb()
.then(()=>{
  app.on("error",(err)=>{
    console.error("error message",err);
    throw err;
  }),

  app.listen(process.env.port || 8000 , ()=>{
    console.log(`server is listening on port ${process.env.port}`);
  })
})
.catch((err)=>{
  console.log("MONGODB connection fail",err)
})



/*
;(async () => {
  try{
   await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
   app.on("error",(error)=>{
    console.log("ERR:" , error)
   })
//app.on is not a predefined method specifically for handling errors. It seems like you have defined an event listener for the 'error' event on the app object, but this is not a standard or common practice in Express.js.

   app.listen(process.env.PORT , ()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
   })

  }catch(err) {
    console.error("ERROR" , err)
  }
})()
*/