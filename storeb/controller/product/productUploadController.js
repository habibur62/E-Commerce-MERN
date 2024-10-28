const productModel = require("../../models/productModel");


async function productUploadController(req, res) {
    try {

        const productData =  new productModel(req.body)

        const saveProduct = await productData.save()

        res.status(201).json({
            data: saveProduct,
            success: true,
            error: false,
            message: "Product upload Sucessfully!"
        })


    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = productUploadController
