import Book from "../models/book.model";
import Wishlist from "../models/wishlist.model";

export const addToWishlist = async (req) => {
  let book = await Book.findOne({ _id: req.params.productId })
  const existingWishlist = await Wishlist.findOne({
    userId: req.body.userId
  })
  if (existingWishlist) {
    let newBook = {
      productId: book._id,
      description: book.description,
      bookName: book.bookName,
      author: book.author,
      price: book.price
    };
    existingWishlist.book.push(newBook);
    const wishlist = await Wishlist.findByIdAndUpdate({
      _id: existingWishlist._id
    }, {
      $set: {
        book: existingWishlist.book,
      },
    }, { new: true });
    return wishlist;
  } else {
    let userWishlist = new Wishlist({
      "userId": req.body.userId,
      "book": {
        productId: book._id,
        description: book.description,
        bookName: book.bookName,
        author: book.author,
        price: book.price
      }
    })
    return await userWishlist.save();
  }
}

export const getWishlist = async (body) => {
  const data = await Wishlist.findOne({
    userId: body.userId
  })
  if (data == null) {
    throw new Error("Wishlist is Empty")
  } else {
    return data
  }
}

export const removeWishlist = async (req) => {
  const existingWishlist = await Wishlist.findOne({
    userId: req.body.userId
  })
  let bookIndex = await existingWishlist.book.findIndex(bookInWishlist => bookInWishlist.productId == req.params.productId);
  existingWishlist.book.splice(bookIndex,1)
  const updateWishlist = await Wishlist.findByIdAndUpdate({
    _id: existingWishlist._id
  }, {
    $set: {
      book: existingWishlist.book,
    },
  }, { new: true });
  return updateWishlist;
}