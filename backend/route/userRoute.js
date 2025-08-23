import express from 'express'
import { authHandler } from '../middleware/authHandler.js';
import { getCurrentUser } from '../controller/userController.js';

const router = express.Router();

router.post("/getCurrentUser",authHandler,getCurrentUser);

export const userRouter = router;