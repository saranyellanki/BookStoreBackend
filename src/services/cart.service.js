import Book from "../models/book.model";
import Cart from "../models/cart.model";

export const addToCart = async (req) => {
  let book = await Book.findOne({ _id: req.params.productId })
  const availableQuantity = book.quantity;
  const existingCart = await Cart.findOne({
    userId: req.body.userId
  })
  if (existingCart) {
    book.quantity = 1;
    let newBook = {
      productId: book._id,
      description: book.description,
      bookName: book.bookName,
      author: book.author,
      quantity: book.quantity,
      price: book.price
    };
    existingCart.book.push(newBook);
    const cart = await Cart.findByIdAndUpdate({
      _id: existingCart._id
    }, {
      $set: {
        book: existingCart.book,
        cart_total: existingCart.cart_total + book.quantity * book.price,
        isPurchased: false
      },
    }, { new: true });
    return cart;
  } else {
    book.quantity = 1;
    let userCart = new Cart({
      "userId": req.body.userId,
      "book": {
        productId: book._id,
        description: book.description,
        bookName: book.bookName,
        author: book.author,
        quantity: book.quantity,
        price: book.price
      },
      "cart_total": book.quantity * book.price,
      "isPurchased": false
    })
    const newCart = await userCart.save();
    return newCart;
  }
}

export const getCart = async (body) => {
  const data = await Cart.findOne({
    userId: body.userId
  })
  if (data == null) {
    return
  } else {
    return data
  }
}

export const updateCart = async (req) => {
  const existingCart = await Cart.findOne({
    userId: req.body.userId
  })
  let book = await existingCart.book.find(bk => bk._id == req.params._id)
  let bookIndex = await existingCart.book.findIndex(bookInCart => bookInCart._id == req.params._id)
  existingCart.book[bookIndex].quantity = req.body.quantity;
  if (book) {
    const updateCart = await Cart.findByIdAndUpdate({
      _id: existingCart._id
    }, {
      $set: {
        book: existingCart.book,
        cart_total: existingCart.cart_total + book.price * req.body.quantity
      },
    }, { new: true })
    return updateCart
  } else {
    throw new Error("No book with this id exist")
  }
}

export const removeItem = async (req) => {
  const existingCart = await Cart.findOne({
    userId: req.body.userId
  })
  let book = await existingCart.book.find(bookInCart => bookInCart._id == req.params._id);
  let bookIndex = await existingCart.book.findIndex(bookInCart => bookInCart._id == req.params._id);
  existingCart.book.splice(bookIndex,1)
  const updateCart = await Cart.findByIdAndUpdate({
    _id: existingCart._id
  }, {
    $set: {
      book: existingCart.book,
      cart_total: existingCart.cart_total - book.quantity * book.price 
    },
  }, { new: true });
  return updateCart;
}