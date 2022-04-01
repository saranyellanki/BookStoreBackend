import * as CustomerService from '../services/customer.service';
import HttpStatus from 'http-status-codes';

export const customerDetails = async(req,res,next) => {
  try {
    const data = await CustomerService.customerDetails(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "Customer details added"
    })
  } catch (error) {
    next(error)
  }
}