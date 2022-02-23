import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const addToCart = async (req,res,next) => {
  try {
    const data = await CartService.addToCart(req);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Added to Cart'
    });
  } catch (error) {
    next(error)
  }
}

export const getCart = async (req,res,next) => {
  try {
    const data = await CartService.getCart(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All cart items fetched successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateCart = async (req,res,next) => {
  try {
    const data = await CartService.updateCart(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "Cart updated"
    })
  } catch (error) {
    next(error);
  }
}

export const removeItem = async (req,res,next) => {
  try {
    await CartService.removeItem(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: "Item removed from cart"
    })
  } catch (error) {
    next(error)
  }
}