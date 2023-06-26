import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/login',
  Validations.loginFieldValidator,
  (req: Request, res: Response) => userController.login(req, res),
);

userRouter.get(
  '/login/role',
  AuthMiddleware.validateUserToken,
  (req: Request, res: Response) => userController.loginRole(req, res),
);

export default userRouter;
