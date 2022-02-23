import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post('/add_cart_item/:productId', userAuth, cartController.addToCart)

//route to get cart items
router.get('/get_cart_items', userAuth, cartController.getCart)

//route to update quantity
router.put('/cart_item_quantity/:_id', userAuth, cartController.updateCart)

//route to delete book
router.delete('/remove_cart_item/:_id', userAuth, cartController.removeItem)

export default router;