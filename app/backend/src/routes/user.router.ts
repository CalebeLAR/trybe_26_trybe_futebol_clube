import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/login',
  Validations.loginFieldValidator,
  (req: Request, res: Response) => userController.login(req, res),
);

export default userRouter;
