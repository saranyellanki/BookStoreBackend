import Book from '../models/book.model';

export const getBooks = async (req) => {
  const books = await Book.find()
  return books;
}