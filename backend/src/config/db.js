const mongoose=require('mongoose');

require('dotenv').config();

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }catch(err){
        console.error("Database Connection failed");
        process.exit(1);
    }
}



module.exports=connectDB;