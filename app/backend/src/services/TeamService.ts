import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import { ITeam } from '../Interfaces/teams/ITeam';

class TeamService {
  private teamModel = new TeamModel();

  async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data };
  }

  async findByPk(id:number): Promise<ServiceResponse<ITeam>> {
    const data = await this.teamModel.findById(id);
    if (!data) {
      return { status: 'NOT_FOUND', data: { message: 'team not found' } };
    }

    return { status: 'SUCCESSFUL', data };
  }
}

export default TeamService;
