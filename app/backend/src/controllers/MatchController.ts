import { Request, Response } from 'express';
import { IMatchGoals } from '../Interfaces/matches/IMatch';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchController {
  private matchService = new MatchService();

  async findAllMatchesWithTeams(req:Request, res:Response):Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress === 'true' || inProgress === 'false') {
      const parseInProgress = JSON.parse(inProgress);

      const { status, data } = await this.matchService.findAllInProgressMatches(parseInProgress);
      return res.status(mapStatusHTTP(status)).json(data);
    }

    const { status, data } = await this.matchService.findAllMatchesWithTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatch(req:Request, res:Response):Promise<Response> {
    const { authorization: token } = req.headers;
    const id = Number(req.params.id);

    const { status, data } = await this.matchService.finishMatch(id, token as string);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(mapStatusHTTP(status)).json({ message: data });
  }

  async updateMatch(req:Request, res:Response):Promise<Response> {
    const { authorization: token } = req.headers;
    const id = Number(req.params.id);
    const match: IMatchGoals = req.body;

    const { status, data } = await this.matchService.updateMatch(id, match, token as string);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}

export default MatchController;
