import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchController {
  private matchService = new MatchService();

  async findAllMatchesWithTeams(req:Request, res:Response):Promise<Response> {
    const { status, data } = await this.matchService.findAllMatchesWithTeams();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default MatchController;
