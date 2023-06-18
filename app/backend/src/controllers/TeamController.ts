import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  private teamService = new TeamService();

  async findAll(_req:Request, res:Response):Promise<Response> {
    const { status, data } = await this.teamService.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findByPk(req:Request, res:Response):Promise<Response> {
    const id = Number(req.params.id);
    const { status, data } = await this.teamService.findByPk(id);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
