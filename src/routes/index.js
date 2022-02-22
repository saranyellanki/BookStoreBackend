import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import productRoute from './product.route';
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
  router.use('/bookstore_user', productRoute)

  return router;
};

export default routes;
