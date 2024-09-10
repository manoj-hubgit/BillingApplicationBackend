import { Router } from "express";
import { registerUser } from "../Controllers/authController.js";

const router=Router();

router.post("/register",registerUser);



export default router;