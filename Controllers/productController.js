import Products from "../Models/productModel.js";
import User from "../Models/userModel.js";
import { errorHandler } from "../Utils/error.js";

export const createProduct = async (req, res,next) => {
  const { productName, productPrice, productQuantity } = req.body;
  const userId = req.user.id;
  const newProduct= new Products({productName, productPrice, productQuantity,user:userId});
  try {
    await newProduct.save();
    res.status(200).json({message:"Product Added Successfully"});

  } catch (error) {
    next(error)
  }
};


export const deleteProduct = async(req,res,next)=>{
    const productId=req.params.id;
    const userId = req.user.id;
    try {
        const product=await Products.findById(productId);
        if(!product || product.user != userId){
            return next(errorHandler(400,"You are not authorized to delete this product"))
        }
         await Products.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted Successfully' });
}
     catch (error) {
        next(error)
    }
};

export const updateProduct = async(req,res,next)=>{
    const productId=req.params.id;
    const { productName, productPrice, productQuantity } = req.body;
    const userId = req.user.id;
    try {
        const product = await Products.findById(productId);
    if (!product || product.user.toString() !== userId.toString()) {
      return next(errorHandler(403, "You are not authorized to update this product"));
    }
        const updatedProduct = await Products.findByIdAndUpdate(productId, {productName, productPrice, productQuantity} )
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
          }
        res.status(200).json({message: 'Product updated Successfully'});
    } catch (error) {
        next(error);
    }
}

export const allProduct = async(req,res,next)=>{
    const userId=req.user.id;
    const {search}= req.query;
    try {
        const query ={
            user:userId,
        };
      if(search){
        query.productName={$regex:search,$options:"i"};
      } 
        const products= await Products.find(query);
        res.status(200).json({message:"All products retrived Successfully",result:products});
    } catch (error) {
        next(error)
    }
}

export const userProduct = async(req,res,next)=>{
    const userId = req.user.id; 
    try {
        const products=await Products.find({user:userId});
        res.status(200).json({ message: "User products retrieved Successfully", result: products });
    } catch (error) {
        
    }
}


export const updateUser= async(req,res,next)=>{
    const userId = req.user.id;
    const {storeName, phone, street, city, state, country, postalCode } = req.body;
try {
    const updateUser =await User.findByIdAndUpdate(
        userId,{ storeName, phone, street, city, state, country, postalCode},{new:true}
    );
    if(!updateUser){
        return next(errorHandler(404,"User not Found"));
    }

    res.status(200).json({ message: "User updated successfully", user: updateUser });
} catch (error) {
    next(error);
}
}

export const deleteUser= async(req,res,next)=>{
    const userId= req.user.id;
    try {
        const deleteUser=await User.findByIdAndDelete(userId);
        if(!deleteUser){
            return next(errorHandler(404,"User not Found"));
        }
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        next(error);  
    }
}

export const getUserProfile=async(req,res,next)=>{
    const userId=req.user.id;
    try {
        const user = await User.findById(userId);
        if(!user){
            return next(errorHandler(404, "User not found"));
        }
        res.status(200).json({message:"Profile took successfully",result:user});
    } catch (error) {
        next(error)
    }
}