import express from 'express'
import { Registration ,adminLogin,googleLogin,login ,logout} from '../controller/authController.js';


const authRoutes = express.Router();

authRoutes.post("/registration" , Registration)
authRoutes.post("/login" , login)
authRoutes.get("/logout" , logout)
authRoutes.post("/googlelogin" , googleLogin)
authRoutes.post("/adminlogin" , adminLogin)


export default authRoutes;