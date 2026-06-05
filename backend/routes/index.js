const express = require('express')
const router = express.Router()

// user controllers
const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')

// product controllers
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')

// cart controllers
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const forgotPassword = require('../controller/user/forgotPassword')
const resetPassword = require('../controller/user/resetPassword')
const { createCheckoutSession } = require("../controller/payment/paymentController")
const adminUsersCartDelivery = require("../controller/admin/adminUsersCartDelivery")
const saveDeliveryInfoController = require("../controller/order/saveDeliveryInfoController")

router.post("/save-delivery-info", authToken, saveDeliveryInfoController)
router.get("/admin-users-cart-delivery", authToken, adminUsersCartDelivery)
router.post("/checkout", authToken, createCheckoutSession)

// ================= USER =================
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)


router.get("/user-details", authToken, userDetailsController)
router.post("/userLogout", userLogout)

// ================= ADMIN =================
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)
const deleteUserController = require("../controller/user/delete-user")

router.delete("/delete-user", authToken, deleteUserController)

const deleteProductController = require("../controller/product/deleteProductController")
router.delete("/delete-product", authToken, deleteProductController)

// ================= PRODUCT =================
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)

router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)

router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// ================= CART =================
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)

// ✔️ صححنا الاسم هنا
router.get("/view-cart-product", authToken, addToCartViewProduct)

router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body
    console.log("email", email)

    if (!email) {
      return res.json({
        success: false,
        message: "Email is required"
      })
    }

    // هنا تقدر تزيد إرسال email (nodemailer)

    return res.json({
      success: true,
      message: "Reset link sent to your email"
    })

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
})


module.exports = router