import Order from '../models/order.model';
import Cart from '../models/cart.model';

export const order = async (req) => {
  let existingCart = await Cart.findOne({
    userId: req.body.userId
  })
  if (existingCart) {
    let bookArr = existingCart.book;
    let orderCart = new Order({
      "orders": bookArr
    })
    const order = await orderCart.save();
    existingCart.book = [];
    await Cart.findByIdAndUpdate({
      _id: existingCart._id
    }, {
      $set: {
        book: existingCart.book,
      },
    }, { new: true })
    return order;
  } else {
    throw new Error("No cart exist")
  }
}