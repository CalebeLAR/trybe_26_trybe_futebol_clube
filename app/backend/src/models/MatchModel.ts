import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatch, IMatchGoals, IMatchTeam } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';

type SequelizeMatchTeam = SequelizeMatch & {
  homeTeam: ITeam['teamName'];
  awayTeam: ITeam['teamName'];
};

const getMatchesWithTeams = (sequelizeMatchTeam:SequelizeMatchTeam) => ({
  id: sequelizeMatchTeam.id,
  homeTeamId: sequelizeMatchTeam.homeTeamId,
  homeTeamGoals: sequelizeMatchTeam.homeTeamGoals,
  awayTeamId: sequelizeMatchTeam.awayTeamId,
  awayTeamGoals: sequelizeMatchTeam.awayTeamGoals,
  inProgress: sequelizeMatchTeam.inProgress,
  homeTeam: sequelizeMatchTeam.homeTeam,
  awayTeam: sequelizeMatchTeam.awayTeam,
});

class MatchModel {
  private model = SequelizeMatch;

  async findAllMatchesWithTeams():Promise<IMatchTeam[]> {
    const sequelizeMatches = await this.model.findAll({
      where: { },
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    }) as unknown as SequelizeMatchTeam[];

    const matches = sequelizeMatches.map((mt) => getMatchesWithTeams(mt));

    return matches;
  }

  async fetchInProgressMatches(inProgress: boolean):Promise<IMatchTeam[]> {
    const sequelizeInProgressMatches = await this.model.findAll({
      where: { inProgress },
      include: [{
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      }, {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    }) as unknown as SequelizeMatchTeam[];

    const inProgressMatches = sequelizeInProgressMatches.map((mt) => getMatchesWithTeams(mt));

    return inProgressMatches;
  }

  async finishMatch(id: number):Promise<number> {
    const [sequelizeMatchUpdated] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    return sequelizeMatchUpdated;
  }

  async updateMatch(id: number, match: IMatchGoals):Promise<number> {
    const [sequelizeMatch] = await this.model.update(
      match,
      { where: { id } },
    );

    return sequelizeMatch;
  }

  async findMatchByPk(id: number):Promise<IMatch | null> {
    const sequelizeMatch = await this.model.findByPk(id);
    if (!sequelizeMatch) return null;

    const match: IMatch = {
      id: sequelizeMatch.id,
      homeTeamGoals: sequelizeMatch.homeTeamGoals,
      awayTeamGoals: sequelizeMatch.awayTeamGoals,
      awayTeamId: sequelizeMatch.awayTeamId,
      homeTeamId: sequelizeMatch.homeTeamId,
      inProgress: sequelizeMatch.inProgress,
    };

    return match;
  }
}

export default MatchModel;
