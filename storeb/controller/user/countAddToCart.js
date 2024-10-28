const addToCartModel = require("../../models/cartProduct")

const countAddToCart = async(req, res) =>{
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message: "ok",
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

module.exports = countAddToCart