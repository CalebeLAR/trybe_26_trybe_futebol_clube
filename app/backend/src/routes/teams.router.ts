import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/teams', (req: Request, res: Response) => teamController.findAll(req, res));

export default teamRouter;
