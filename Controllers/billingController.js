import Bill from "../Models/billModel.js";
import Products from "../Models/productModel.js";

export const generateBill = async (req, res, next) => {
    const userId = req.user.id;
    const { products } = req.body;

    if (!products || products.length === 0) {
        return res.status(400).json({ message: "No products provided" });
    }

    try {
        let totalAmount = 0;
        const validatedProducts = await Promise.all(
            products.map(async ({ productId, quantity }) => {
                const product = await Products.findById(productId);
                if (!product) {
                    throw new Error(`Product with ID ${productId} not found`);
                }

                const price = product.productPrice * quantity;
                totalAmount += price;

                return {
                    productId: product._id,
                    quantity,
                    price,
                };
            })
        );

        const latestBill = await Bill.findOne().sort({ createdAt: -1 });
        const billNumber = latestBill ? latestBill.billNumber + 1 : 1;

        const bill = new Bill({
            billNumber,
            userId,
            products: validatedProducts,
            totalAmount,
        });

        await bill.save();
        res.status(200).json({ message: "Bill generated successfully.", bill });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "An error occurred while generating the bill.", error });
    }
};

export const getAllBill = async (req, res) => {
    try {
        const bills = await Bill.find({userId:req.user.id})
        .populate({
            path:'products.productId',
            model:'Products'
        })
        res.status(200).json({ message: "All bills retrieved successfully", bills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch bills", error });
    }
};
