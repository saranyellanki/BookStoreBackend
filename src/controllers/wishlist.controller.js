import HttpStatus from 'http-status-codes';
import * as WishlistServices from '../services/wishlist.service';

export const addToWishlist = async (req,res,next) => {
  try {
    const data = await WishlistServices.addToWishlist(req);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Added to Wishlist'
    });
  } catch (error) {
    next(error)
  }
}

export const getWishlist = async (req,res,next) => {
  try {
    const data = await WishlistServices.getWishlist(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All wishlist items fetched successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const removeWishlist = async (req,res,next) => {
  try {
    await WishlistServices.removeWishlist(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: "Item removed from wishlist"
    })
  } catch (error) {
    next(error)
  }
}