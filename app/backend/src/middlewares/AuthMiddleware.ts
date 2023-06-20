import { Request, Response, NextFunction } from 'express';

export default class AuthMiddleware {
  static validateToken(req:Request, res:Response, next:NextFunction) {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    return next();
  }
}
