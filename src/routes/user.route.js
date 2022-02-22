import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/registration', newUserValidator, userController.newUser);

// //verify user
// router.post('/verification/:token', userAuth, userController.isVerified);

//route to login user
router.post('/login', loginValidator, userController.login)

export default router;