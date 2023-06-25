import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { IMatch, IMatchGoals, IMatchTeam } from '../Interfaces/matches/IMatch';
// import { ITeam } from '../Interfaces/teams/ITeam';

// type SequelizeMatchTeam = {
//   dataValues: IMatch;
//   homeTeam: { dataValues: ITeam };
//   awayTeam: { dataValues: ITeam };
// };

// const getMatchesWithTeams = (sequelizeMatchTeam: SequelizeMatchTeam) => {
//   const matchsTeams: IMatchTeam = {
//     id: sequelizeMatchTeam.dataValues.id,
//     homeTeamId: sequelizeMatchTeam.dataValues.homeTeamId,
//     homeTeamGoals: sequelizeMatchTeam.dataValues.homeTeamGoals,
//     awayTeamId: sequelizeMatchTeam.dataValues.awayTeamId,
//     awayTeamGoals: sequelizeMatchTeam.dataValues.awayTeamGoals,
//     inProgress: sequelizeMatchTeam.dataValues.inProgress,
//     homeTeam: sequelizeMatchTeam.homeTeam.dataValues,
//     awayTeam: sequelizeMatchTeam.awayTeam.dataValues,
//   };

//   return matchsTeams;
// };

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
    }) as unknown;

    return sequelizeMatches as IMatchTeam[];
  }

  async fetchInProgressMatches(inProgress: boolean):Promise<IMatchTeam[]> {
    const sequelizeMatchInProgress = await this.model.findAll({
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
    }) as unknown;

    return sequelizeMatchInProgress as IMatchTeam[];
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
