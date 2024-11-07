import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/error.js";
import dotenv from "dotenv";

dotenv.config();

export const middleWare=(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token){
        return next(errorHandler(401,"Unauthorized Access"))  
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            return next(errorHandler(401,'Unauthorized Access'))
        }
        req.user=user; //just sending user using req.user
        next();
    })
}
