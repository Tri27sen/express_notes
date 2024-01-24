require('dotenv').config({path:'./.env'})
const cloudinary = require("cloudinary").v2;
const fs = require("fs")

// delete in file system - unlink 
cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET
});
// is designed to upload a file to Cloudinary

console.log( process.env.CLOUDINARY_CLOUD_NAME,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET)
const uploadOnCloudinary = async (localFilePath) =>{
  try{
    if (!localFilePath) return null 
    // upload the file on cloudinary 
   const response = await  cloudinary.uploader.upload(localFilePath ,{
      resource_type:"auto"
  })
  console.log("file is uploaded successfully on cloudinary " , response.url);
  return response
}
  catch (error) {
    fs.unlinkSync(localFilePath) // remove locally saved temorary file as upload failed 
    return null
  }
}
console.log("cloudinary working .....")
module.exports  = uploadOnCloudinary
//method - parameter - lpcal file path - upload if uploaded successfully then unlibk it 