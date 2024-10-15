const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async()=>{
     try {
        await mongoose.connect('mongodb://127.0.0.1:27017/rocked');
        console.log('Database connected successfully');
     } catch (error) {
          console.log('Database connection Failed !', error)
          throw error; 
     }
}

module.exports = {connectDB}