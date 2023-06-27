import { Request, Router, Response } from 'express';
// import LeaderboardController from '../controllers/LeaderboardController';

// const leaderboardController = new LeaderboardController();

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => res.status(200).json('rota leaderboarder'),
);

export default LeaderboardRouter;
