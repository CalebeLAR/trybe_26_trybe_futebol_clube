import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/matches',
  (req: Request, res: Response) => matchController.findAllMatchesWithTeams(req, res),
);

matchRouter.patch(
  '/matches/:id/finish',
  AuthMiddleware.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default matchRouter;
