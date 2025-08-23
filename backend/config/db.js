import mongoose from "mongoose";

export const connectDb = async() => {
     try {
          mongoose.connect(process.env.MONGO_URI);

          mongoose.connection.on("connected",()=>{
               console.log("Db Connected Successfully...")
          });

          mongoose.connection.on("error",()=>{
               console.log("Error while connecting Db")
          });
     } catch (err) {
          console.log("Error from Db -: ",err.message);
          process.exit(1);
     }
}