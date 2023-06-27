import { Request, Router, Response } from 'express';
import LeaderboardHomeController from '../controllers/LeaderboardHomeController';
import LeaderboardAwayController from '../controllers/LeaderboardAwayController';

const leaderboardHomeController = new LeaderboardHomeController();
const leaderboardAwayController = new LeaderboardAwayController();

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) =>
    leaderboardHomeController.getHomeTeamPerformanceInformation(req, res),
);

LeaderboardRouter.get(
  '/leaderboard/away',
  (req: Request, res: Response) =>
    leaderboardAwayController.getHomeTeamPerformanceInformation(req, res),
);

export default LeaderboardRouter;
