import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import { userRouter } from "./route/userRoute.js";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/v1/user",userRouter);

app.listen(port,async()=>{
     await connectDb();
     console.log(`Server is running at http://localhost:${port}`)
})