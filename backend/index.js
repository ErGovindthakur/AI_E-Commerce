import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { authRouter } from "./route/authRoute.js";
import { userRouter } from "./route/userRoute.js";

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
     origin:["http://localhost:5173","http://localhost:5174"],
     credentials:true
}))
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);

app.listen(port,async()=>{
     await connectDb();
     console.log(`Server is running at http://localhost:${port}`)
})