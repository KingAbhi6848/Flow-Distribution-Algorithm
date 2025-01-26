import express from 'express';
import astroController from '../Controllers/astrologer.controller.js';
import auth from '../Middleware/Auth-Handling/auth.js';

const astroRoute = express.Router();

const astrologerController = new astroController();

astroRoute.post('/register',astrologerController.register);
astroRoute.post('/login',astrologerController.login);

export default astroRoute;