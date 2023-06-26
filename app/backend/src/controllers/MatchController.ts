import { Request, Response } from 'express';
import { IMatchGoals, INewMatch } from '../Interfaces/matches/IMatch';
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
    const id = Number(req.params.id);

    const { status, data } = await this.matchService.finishMatch(id);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(mapStatusHTTP(status)).json({ message: data });
  }

  async updateMatch(req:Request, res:Response):Promise<Response> {
    const id = Number(req.params.id);
    const match: IMatchGoals = req.body;

    const { status, data } = await this.matchService.updateMatch(id, match);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async postNewMatch(req:Request, res:Response):Promise<Response> {
    const match: INewMatch = req.body;

    const { status, data } = await this.matchService.postNewMatch(match);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(201).json(data);
  }
}

export default MatchController;
