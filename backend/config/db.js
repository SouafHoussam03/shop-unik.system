// const mongoose = require("mongoose")


// async function connectDB(){
//     try{
//         await mongoose.connect(process.env.MONGODB_URI) 
//     }catch(err){
//         console.log(err)
//     }
// }

// module.exports = connectDB

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "shop",
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 🔥 Events
    mongoose.connection.on("connected", () => {
      console.log("🟢 Mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 Mongoose error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("🟡 Mongoose disconnected");
    });

  } catch (error) {
    console.error("❌ Initial connection failed:", error.message);
    process.exit(1); // وقف السيرفر
  }
};

module.exports = connectDB;