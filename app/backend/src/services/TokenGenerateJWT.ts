import * as jwt from 'jsonwebtoken';
import { ITokenGenerator } from '../Interfaces/ITokenGenerator';

export default class TokenGenerator implements ITokenGenerator {
  private jwt = jwt;
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  gerToken<T extends object>(payload: T):string {
    return this.jwt.sign(payload, this.jwtSecret, { algorithm: 'HS256', expiresIn: '1h' });
  }

  verifyToken<T extends object>(token: string): (T | null) {
    try {
      const payload = jwt.verify(token, this.jwtSecret);

      return payload as T;
    } catch (jwtErr) {
      return null;
    }
  }
}
