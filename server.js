const app = require('./app');
require('dotenv').config()
const PORT = process.env.PORT||5000;
const {connectDB} = require('./config/db');

const startServer = async () => {
     try {
         await connectDB();  
         app.listen(PORT, () => {
             console.log(`Server is running on port ${PORT}`);
         });
     } catch (error) {
         console.error('Failed to start server:', error);
         process.exit(1);  
     }
 };
 
 startServer();