import express from 'express';
import UserController from '../Controllers/user.controller.js';
import auth from '../Middleware/Auth-Handling/auth.js';

const userRoute = express.Router();
const userController = new UserController();

userRoute.post('/register', userController.register);
userRoute.post('/login',userController.login);

userRoute.post('/logout',userController.logout);


userRoute.get('/register',userController.viewRegister);
userRoute.get('/login',userController.viewLogin);
userRoute.get('/home',auth,userController.home);


export default userRoute;