import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service';

export const order = async (req, res, next) => {
  try {
    const data = await OrderService.order(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "Order placed successully"
    })
  } catch (error) {
    next(error)
  }
}