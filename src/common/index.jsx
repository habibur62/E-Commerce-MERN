const backendDomin = "http://localhost:8000"


const SummaryApi = {
    signUp : {
        url: `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url: `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user : {
        url : `${backendDomin}/api/user-logout`,
         method: "post"
    },
    allUsers : {
        url : `${backendDomin}/api/allUsers`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "put"
    },
    productUpload : {
        url : `${backendDomin}/api/product-upload`,
        method : "post"
    },
    allProducts : {
        url : `${backendDomin}/api/all-products`,
        method : "get"
    },
    updateProducts : {
        url : `${backendDomin}/api/update-product`,
        method : "put"
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
       url : `${backendDomin}/api/category-product`,
       method: "post"
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method: "post"
     },
     addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method: "post"
     },
     countAddToCartProduct : {
        url : `${backendDomin}/api/count-addtocart`,
        method: "get"
     },
     viewAddToCartProduct : {
        url : `${backendDomin}/api/view-addtocart`,
        method: "get"
     },
     updateAddToCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method: "put"
     },
     deleteAddToCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method: "delete"
     },
     searchProduct : {
        url : `${backendDomin}/api/search`,
        method: "get"
     }

     

     
}

export default SummaryApi