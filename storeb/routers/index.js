const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogOut = require('../controller/user/userLogOut')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const productUploadController = require('../controller/product/productUploadController')
const getProductController = require('../controller/product/getProduct')
const updateProduct = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCart = require('../controller/user/countAddToCart')
const addToCartView = require('../controller/user/addToCartView')
const updateAddToCartProduct = require('../controller/user/UpdateAddToCartProduct')
const deleteAddToCart = require('../controller/user/deleteAddToCart')
const searchProduct = require('../controller/product/searchProduct')
const paymentInit = require('../controller/order/paymentController')
const successController = require('../controller/order/successController')


router.post("/signup", userSignUpController )

router.post("/signin", userSignInController)

router.get("/user-details", authToken, userDetailsController)


router.post("/user-logout", userLogOut)

//admin panel
router.get("/allUsers",authToken , allUsers)

router.put("/update-user",authToken , updateUser)

router.post("/product-upload",authToken , productUploadController)

router.get("/all-products",authToken, getProductController)

router.put("/update-product",authToken, updateProduct)


// product

router.get("/get-categoryProduct", getCategoryProduct)

router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)

//user add to cart 

router.post("/addtocart", authToken, addToCartController)
router.get("/count-addtocart", authToken, countAddToCart)
router.get("/view-addtocart", authToken, addToCartView)
router.put("/update-cart-product",authToken, updateAddToCartProduct)
router.delete("/delete-cart-product",authToken, deleteAddToCart )



//payment
router.post("/checkout", authToken, paymentInit)
router.post("/success", authToken, successController)















module.exports = router