const productModel = require("../../models/productModel");


async function updateProduct(req, res) {
    try {

        const sessionProduct = req.body._id

        const product = await productModel.findById(sessionProduct)


        const updateProduct = await productModel.findByIdAndUpdate(sessionProduct, req.body )
       
        res.status(201).json({
            data: updateProduct,
            success: true,
            error: false,
            message: "Product update Sucessfully!"
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = updateProduct
