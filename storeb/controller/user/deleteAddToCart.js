const addToCartModel = require("../../models/cartProduct")

const deleteAddToCart = async (req, res)=>{
    try {
        const currentId = req.userId
        const productId = req.body.productId

        const deleteProduct = await addToCartModel.deleteOne({userId: currentId, productId: productId})

        if (deleteProduct.deletedCount === 0) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            });
        }
        
        res.status(204).json({
            message: "Delete Product successfully",
            success: true,
            error: false
        })


    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

module.exports = deleteAddToCart