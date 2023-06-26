import { NextFunction, Request, Response } from 'express';

export default class Validations {
  static loginFieldValidator(req:Request, res:Response, next:NextFunction) {
    const login = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in login));

    if (notFoundKey) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(login.email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (login.password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }

  static postNewMatchValidator(req:Request, res:Response, next:NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    return next();
  }
}
