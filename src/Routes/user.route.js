import express from 'express';
import UserController from '../Controllers/user.controller.js';
import auth from '../Middleware/Auth-Handling/auth.js';

const userRoute = express.Router();
const userController = new UserController();

userRoute.post('/register', userController.register);
userRoute.post('/login',userController.login);
userRoute.get('/home',auth,userController.home)
userRoute.post('/logout',userController.logout);


export default userRoute;