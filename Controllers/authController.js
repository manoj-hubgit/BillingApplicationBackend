import User from "../Models/userModel.js";
import  {errorHandler} from "../Utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser=async(req,res,next)=>{
    const { storeName, email, phone, street, city,state,country,postalCode, password } =req.body;
    const hashedPassword= await bcryptjs.hashSync(password,10)

    const newUser=new User({storeName, email, phone, street, city,state,country,postalCode,password:hashedPassword});
    try {
        await newUser.save();
        res.status(200).json({message:"User Registered Successfully"})
    } catch (error) {
        console.log("Registration Error:", error);
        next(error)    
    }
}

export const loginUser=async(req,res,next)=>{
const {email,password}=req.body;
try {
    const userDetail=await User.findOne({email});
    const userPassword= bcryptjs.compareSync(password,userDetail.password);
    if(!userDetail || !userPassword){
        return next(errorHandler(400,'Invalid Credentials'))
    }
    const token=jwt.sign({id:userDetail._id},process.env.JWT_SECRET_KEY);
    
    res.status(200).json({message:"Logged in successfully",token:token, storeName:userDetail.storeName})
} catch (error) {
    next(error)
}
}