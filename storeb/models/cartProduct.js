const mongoose = require('mongoose')

const addToCartSchema = mongoose.Schema({
    productId : {
        ref: 'products',
        type: String
    },
    quantity : Number,
    userId : String
},{
    timestamps : true
}
)

const addToCartModel = mongoose.model("addToCart", addToCartSchema)

module.exports = addToCartModel