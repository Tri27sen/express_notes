const express = require('express')
const app = express()
const cors = require('cors')
const cookieparser = require('cookie-parser')
//cookieparser - server can use and access users cookies , crude operations , store secure cookies only by server
const { VirtualType } = require('mongoose')
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials :true
}))
// middleware used body-parser , multer - file 
app.use(express.json({limit:'16kb'}))
//url encoded such as space is 20% and other things are encoded 
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))
app.use(cookieparser())
module.exports = app 