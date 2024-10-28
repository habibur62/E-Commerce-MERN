const addToCartModel = require("../../models/cartProduct")


const addToCartView = async ( req, res) =>{
    try {
        
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId: currentUser
        }).populate("productId")

        return res.json({
            data: allProduct,
            message: "Ok",
            success: true,
            error: false
        })





    } catch (error) {
        res.json({
        message: error.message || error,
        success: false,
        error : true
        })
        
    }
}

module.exports = addToCartView