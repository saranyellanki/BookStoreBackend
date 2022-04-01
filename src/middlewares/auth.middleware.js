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
    let bearerToken = req.headers['token']
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'UnAuthorized, please enter a valid token'
        });
      } else {
        req.body['userId'] = decoded.id
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
