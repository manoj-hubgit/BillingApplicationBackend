import { Router } from "express";
import { middleWare } from "../MiddleWare/verifyToken.js";
import { generateBill, getAllBill } from "../Controllers/billingController.js";

const router=Router();
router.post("/generateBill",middleWare,generateBill);
router.get("/getBillData",middleWare,getAllBill);
export default router;