import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.patch(
  '/matches/:id/finish',
  AuthMiddleware.validateUserToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/matches/:id',
  AuthMiddleware.validateUserToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

matchRouter.get(
  '/matches',
  (req: Request, res: Response) => matchController.findAllMatchesWithTeams(req, res),
);

matchRouter.post(
  '/matches',
  AuthMiddleware.validateUserToken,
  Validations.postNewMatchValidator,
  (req: Request, res: Response) => matchController.postNewMatch(req, res),
);

export default matchRouter;
