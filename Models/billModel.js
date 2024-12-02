import mongoose from "mongoose";

const billSchema=new mongoose.Schema({
    billNumber:{type:Number,unique:true,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    products:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId,ref:"Products"},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true},
        },
    ],
    totalAmount:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
});

const Bill=mongoose.model("Bill",billSchema);

export default Bill;