import express from "express";
import { login, logout, register } from "../controller/userController.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",authHandler,logout)

export const userRouter = router;