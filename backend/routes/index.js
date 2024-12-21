import express from "express";
import { userSignUpController } from "../controller/user/userSignUp.js";
import userSignInController from "../controller/user/userSignIn.js";
import authToken from "../middleware/authToken.js";
import userDetailsController from "../controller/user/userDetails.js";
import userLogoutController from '../controller/user/userLogout.js'
import AllUserController from "../controller/user/AllUsers.js";
import updateUser from "../controller/user/updateUser.js";
import uploadProductController from "../controller/product/uploadProduct.js";
import getProductController from "../controller/product/getProduct.js";
import updateProductController from "../controller/product/updateProduct.js";
import getCategoryProduct from "../controller/product/getCategoryProduct.js";
import getCategoryWiseProduct from "../controller/product/getCategoryWiseProduct.js";
import getProductDetails from "../controller/product/getProductDetails.js";
import AddToCartController from "../controller/user/addToCart.js";
import countAddToCartProductController from "../controller/user/countAddToCartProduct.js";
import addToCartViewProduct from "../controller/user/addToCartViewProduct.js";
import updateAddToCartController from "../controller/user/updateAddToCartProduct.js";
import deleteAddToCartProduct from "../controller/user/deleteAddTpCartProduct.js";
import searchProductController from "../controller/product/searchProduct.js";
import fiterProductController from "../controller/product/filterProduct.js";
import paymentController from "../controller/order/paymentController.js";
import webhooks from "../controller/order/webhooks.js";
import orderController from "../controller/order/orderController.js";

const router = express.Router();

router.post('/signup',userSignUpController)
router.post('/signin',userSignInController)


router.get('/user-details',authToken,userDetailsController)
router.get('/user-logout',userLogoutController)


/* Admin panel */
router.get('/all-users',authToken,AllUserController)
router.post('/update-users',authToken,updateUser)


/* product */

router.post('/upload-product',authToken,uploadProductController)
router.get('/get-products',getProductController)
router.post('/update-product',authToken,updateProductController)

router.get('/get-categoryProduct',getCategoryProduct)
router.post('/category-product',getCategoryWiseProduct)
router.post('/product-details',getProductDetails)
router.get('/search',searchProductController)
router.post('/filter',fiterProductController)

/* user add to cart */

router.post('/addtocart',authToken,AddToCartController)
router.get('/countAddToProduct',authToken,countAddToCartProductController)
router.get('/viewCartProduct',authToken,addToCartViewProduct)
router.post('/update-cart-product',authToken,updateAddToCartController)
router.post('/delete-cart-product',authToken,deleteAddToCartProduct)


/* paymetn and order */

router.post('/checkout',authToken,paymentController)

router.post("/webhook",webhooks)   // api webhook 

router.get("/order-list",authToken,orderController)



export default router;
