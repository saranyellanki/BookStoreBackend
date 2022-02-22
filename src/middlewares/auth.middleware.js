import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.params.token
    jwt.verify(bearerToken, process.env.IS_VERIFIED, (err, decoded) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Not Authenticated'
        });
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
