import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import productRoute from './product.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import customerRoute from './customer.route';
import orderRoute from './order.route'
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome To Book Store');
  });
  router.use('/bookstore_user', userRoute);
  router.use('/bookstore_user', productRoute);
  router.use('/bookstore_user', cartRoute);
  router.use('/bookstore_user', wishlistRoute);
  router.use('/bookstore_user', customerRoute);
  router.use('/bookstore_user', orderRoute)

  return router;
};

export default routes;
