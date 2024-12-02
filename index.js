import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import authRoute from "./Routers/authRouter.js";
import productRoute from "./Routers/ProductRouter.js";
import billingRoute from "./Routers/BillingRouter.js";
dotenv.config();
const app=express();

app.use(express.json());
app.use(cors({
    origin:'*',
    credentials:true
}));

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/bill",billingRoute);

connectDB();
app.get("/",(req,res)=>{
    res.send("app is running successfully");
})
app.listen(process.env.PORT,()=>{
    console.log("app is listining to the port");
})