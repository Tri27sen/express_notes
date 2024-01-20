require('dotenv').config();
const mongoose = require('mongoose');
const db_name = require('../constants.js');
console.log(db_name)
console.log(`${process.env.MONGODB_URI}`)


// ()() - immediate exucution 
// ;( async () => {})()
// database communication always using try catch 
const connectdb = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);
    console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectdb;
