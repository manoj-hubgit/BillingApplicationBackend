import User from "../Models/userModel.js";
import  {errorHandler} from "../Utils/error.js";
import bcryptjs from "bcryptjs";

export const registerUser=async(req,res)=>{
    const {username,email,password}=req.body;
    const hashedPassword= await bcryptjs.hashSync(password,10)

    const newUser=new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        res.status(200).json({message:"User REgistered Successfully"})
    } catch (error) {
        next(error)
    }
}