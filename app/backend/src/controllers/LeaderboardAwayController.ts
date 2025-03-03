import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardAwayService from '../services/LeaderboardAwayService';

class LeaderboardAwayController {
  private leadboardService = new LeaderboardAwayService();

  async getHomeTeamPerformanceInformation(req:Request, res:Response):Promise<Response> {
    const { status, data } = await this.leadboardService.getHomeTeamPerformanceInformation();
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }
}

export default LeaderboardAwayController;
