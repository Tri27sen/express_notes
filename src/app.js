const express = require('express')
const app = express()
const cors = require('cors')
const cookieparser = require('cookie-parser')
//cookieparser - server can use and access users cookies , crude operations , store secure cookies only by server

app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials :true
}))
console.log("hello from app.js")

// middleware used body-parser , multer - file 
app.use(express.json({limit:'16kb'}))
//url encoded such as space is 20% and other things are encoded 
app.use(express.urlencoded({extended:true}))
//it will use the querystring library to parse data and  When extended is true, it uses the qs library which allows for more complex objects and arrays to be parsed.
app.use(express.static("public"))
app.use(cookieparser())



//routes 

const userRouter = require('./routes/user.routes') 

//declaration 
console.log("using userRouter : ")
app.use("/api/v1/users" , userRouter) // userRouter is the middleware 


// In a CommonJS module
module.exports = { app };
