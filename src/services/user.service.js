import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as mailer from '../middlewares/nodemailer';

//create new user
export const newUser = async (body) => {
  const user = await User.findOne({ email: body.email })
  if (user == null) {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const data = await User.create(body);
    // let token = jwt.sign({ id: data._id, isVerified: data.isVerified }, process.env.IS_VERIFIED);
    // await mailer.main(data.email, token)
    return data;
  } else {
    throw new Error("User already exist");
  }
};

// //verification
// export const isVerified = async (body) => {
//   const user = await User.findOne({ email: body.email })
//   if (user == null) {
//     throw new Error("User does not exist")
//   } else {
//     user.isVerified = true;
//     const data = await User.create(user);
//     return data;
//   }
// }

//login user
export const login = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user == null) {
    throw new Error("User does not exist")
  } else {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      return { user, token }
    } else {
      throw new Error("Password is Invalid");
    }
  }
}