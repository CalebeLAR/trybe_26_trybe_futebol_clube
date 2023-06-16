import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const sequelizeTeams = await this.model.findAll();
    const teams = sequelizeTeams.map(({ id, teamName }) => ({ id, teamName }));

    return teams;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const sequelizeTeam = await this.model.findByPk(id);
    if (sequelizeTeam == null) return null;

    const { teamName }: ITeam = sequelizeTeam;
    return { id, teamName };
  }
}
