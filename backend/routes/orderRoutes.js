import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, PlaceOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js';
import isAdmin from '../middleware/isAdmin.js'

const orderRoutes = express.Router();

orderRoutes.post('/placeorder',isAuth, PlaceOrder)
orderRoutes.post('/razorpay',isAuth, placeOrderRazorpay)
orderRoutes.post('/userorder',isAuth, userOrders)
orderRoutes.post('/verifyrazorpay',isAuth, verifyRazorpay)



orderRoutes.post('/list',isAdmin ,allOrders)
orderRoutes.post('/status',isAdmin ,updateStatus)


export default orderRoutes
