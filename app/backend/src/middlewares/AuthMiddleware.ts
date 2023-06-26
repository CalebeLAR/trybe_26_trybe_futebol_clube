import { Request, Response, NextFunction } from 'express';
import { IUser } from '../Interfaces/users/IUser';
import TokenGenerator from '../services/TokenGenerateJWT';

export default class AuthMiddleware {
  static tokenGenerator = new TokenGenerator();
  static validateUserToken(req:Request, res:Response, next:NextFunction) {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const payload = AuthMiddleware.tokenGenerator.verifyToken<IUser>(token);

    if (!payload) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    req.body.payload = payload;
    return next();
  }
}
