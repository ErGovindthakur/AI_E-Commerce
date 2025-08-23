import express from "express";
import { googleLogin, login, logout, register } from "../controller/authController.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",authHandler,logout)
router.post("/googleLogin",googleLogin)

export const authRouter = router;