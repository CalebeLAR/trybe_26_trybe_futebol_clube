import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static handlerError(error:Error, req:Request, res:Response, _next:NextFunction) {
    console.log(error.name);
    return res.status(500).end();
  }
}
