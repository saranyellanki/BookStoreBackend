import express from 'express';
import * as productController from '../controllers/product.controller'

const router = express.Router();

//route to get all books
router.get('/get/book', productController.getBooks)

export default router;