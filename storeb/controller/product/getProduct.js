const productModel = require("../../models/productModel")

const getProductController= async (req, res) =>{

    try {

        const products = await productModel.find()


        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: products
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

module.exports = getProductController