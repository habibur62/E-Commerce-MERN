const addToCartModel = require("../../models/cartProduct")


const updateAddToCartProduct = async(req, res) =>{
    try {

        const currentId = req.userId 
        const productId = req.body.productId
        const qty = req.body.quantity
        
        const updateProduct = await addToCartModel.updateOne(
            { userId: currentId, productId: productId }, // Find cart item by userId and productId
            { $set: { quantity: qty } } // Update the quantity
        );


        res.json({
            message: "Qunatity is updated",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}


module.exports = updateAddToCartProduct