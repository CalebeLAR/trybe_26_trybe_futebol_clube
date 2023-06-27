import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardHomeService from '../services/LeaderboardHomeService';

class LeaderboardHomeController {
  private leadboardhomeService = new LeaderboardHomeService();

  async getHomeTeamPerformanceInformation(req:Request, res:Response):Promise<Response> {
    const { status, data } = await this.leadboardhomeService.getHomeTeamPerformanceInformation();
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(200).json(data);
  }
}

export default LeaderboardHomeController;
