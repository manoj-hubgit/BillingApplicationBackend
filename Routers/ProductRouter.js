import { Router } from "express";
import { allProduct, createProduct, deleteProduct, updateProduct, userProduct } from "../Controllers/productController.js";
import { middleWare } from "../MiddleWare/verifyToken.js";
const router=Router();

router.post("/createProduct",middleWare,createProduct);
router.delete("/deleteProduct/:id",middleWare,deleteProduct);
router.put("/updateProduct/:id",middleWare,updateProduct);
router.get("/allProducts",middleWare,allProduct);
router.get("/userProducts",middleWare,userProduct);

export default router;