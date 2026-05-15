const express = require('express')
const router = express.Router()

// ================= USER CONTROLLERS =================
const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const deleteUserController = require("../controller/user/delete-user")

// ================= PRODUCT CONTROLLERS =================
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const deleteProductController = require("../controller/product/deleteProductController")

// ================= CART CONTROLLERS =================
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')

// ================= PASSWORD CONTROLLERS =================
const forgotPassword = require('../controller/user/forgotPassword')
const resetPassword = require('../controller/user/resetPassword')

// ================= MIDDLEWARE =================
const authToken = require('../middleware/authToken')


// ======================================================
// ================= USER ROUTES ========================
// ======================================================

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)

router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

router.get("/user-details", authToken, userDetailsController)

router.post("/userLogout", userLogout)


// ======================================================
// ================= ADMIN ROUTES =======================
// ======================================================

router.get("/all-user", authToken, allUsers)

router.post("/update-user", authToken, updateUser)

router.delete("/delete-user", authToken, deleteUserController)

router.delete("/delete-product", authToken, deleteProductController)


// ======================================================
// ================= PRODUCT ROUTES =====================
// ======================================================

router.post("/upload-product", authToken, UploadProductController)

router.get("/get-product", getProductController)

router.post("/update-product", authToken, updateProductController)

router.get("/get-categoryProduct", getCategoryProduct)

router.post("/category-product", getCategoryWiseProduct)

router.post("/product-details", getProductDetails)

router.get("/search", searchProduct)

router.post("/filter-product", filterProductController)


// ======================================================
// ================= CART ROUTES ========================
// ======================================================

router.post("/addtocart", authToken, addToCartController)

router.get("/countAddToCartProduct", authToken, countAddToCartProduct)

router.get("/view-cart-product", authToken, addToCartViewProduct)

router.post("/update-cart-product", authToken, updateAddToCartProduct)

router.post("/delete-cart-product", authToken, deleteAddToCartProduct)


// ======================================================

module.exports = router