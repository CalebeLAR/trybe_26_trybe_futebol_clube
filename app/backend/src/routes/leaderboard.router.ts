import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) =>
    leaderboardController.getHomeTeamPerformanceInformation(req, res),
);

export default LeaderboardRouter;
