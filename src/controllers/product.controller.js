import HttpStatus from 'http-status-codes';
import * as BookService from '../services/product.service';

export const getBooks = async (req,res,next) => {
  try {
    const books = await BookService.getBooks(req);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: books,
      message: 'All books fetched'
    });
  } catch (error) {
    next(error)
  }
}