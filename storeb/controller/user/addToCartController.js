const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req, res) => {
  try {
        const {productId} = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({productId, userId : currentUser})

        if(isProductAvailable){
            return res.json({
                message : "Already added to cart",
                success : false,
                error: true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser
        }
        const newAddToCart = new addToCartModel(payload)
        const saveData = await newAddToCart.save()

        res.json({
            data : saveData,
            message : "Product Successfully Added",
            success : true,
            error : false,

        })


  } catch (error) {
    res.json({
        message : error.message || error,
        error: true,
        success: false
    })

  }
}

module.exports = addToCartController
