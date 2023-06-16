import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private teamService = new TeamService();

  async findAll(_req:Request, res:Response):Promise<Response> {
    const { data } = await this.teamService.findAll();

    return res.status(200).json(data);
  }
}

// const test = new TeamController();

// const funçãoAssincrona = async () => {
//   const data = await test.findAll();

//   console.log(data);

//   return data;
// };

// funçãoAssincrona();
