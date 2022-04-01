import express from 'express';
import * as wishlistControler from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post('/add_wish_list/:productId', userAuth, wishlistControler.addToWishlist)

//route to get cart items
router.get('/get_wishlist_items', userAuth, wishlistControler.getWishlist)

//route to delete book
router.delete('/remove_wishlist_item/:productId', userAuth, wishlistControler.removeWishlist)

export default router;