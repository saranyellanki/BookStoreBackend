import express from 'express';
import * as productController from '../controllers/product.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all books
router.get('/get/book', userAuth, productController.getBooks)

export default router;