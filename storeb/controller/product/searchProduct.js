const productModel = require('../../models/productModel')

const searchProduct = async(req, res) =>{
    try {

        const query = req.query.q
        if (!query) {
            return res.status(400).json({
                message: "Search query is required",
                error: true,
                success: false
            });
        }
        // Search for products where name or category contains the query (case-insensitive)
        const matchingProducts = await productModel.find({
            $or: [
                { productName: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ]
        });

        res.json({
            message: "Products fetched successfully",
            data: matchingProducts,
            success: true,
            error: false
        });
        
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = searchProduct