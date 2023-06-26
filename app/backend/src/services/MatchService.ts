import { IMatch, IMatchGoals, IMatchTeam, INewMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import MatchModel from '../models/MatchModel';

class MatchService {
  private matchModel = new MatchModel();

  async findAllMatchesWithTeams():Promise<ServiceResponse<IMatchTeam[]>> {
    const matchesWithTeams = await this.matchModel.findAllMatchesWithTeams();

    return { status: 'SUCCESSFUL', data: matchesWithTeams };
  }

  async findAllInProgressMatches(inProgress: boolean):Promise<ServiceResponse<IMatchTeam[]>> {
    const inProgressMatches = await this.matchModel.fetchInProgressMatches(inProgress);

    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  async finishMatch(id: number):Promise<ServiceResponse<string>> {
    await this.matchModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data: 'Finished' };
  }

  async updateMatch(id:number, dataGoals: IMatchGoals):Promise<ServiceResponse<IMatch>> {
    const sequleizeMatch = await this.matchModel.findMatchByPk(id);

    if (!sequleizeMatch) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    await this.matchModel.updateMatch(id, dataGoals);

    const updatedMatch: IMatch = {
      ...sequleizeMatch,
      homeTeamGoals: dataGoals.homeTeamGoals,
      awayTeamGoals: dataGoals.awayTeamGoals,
    };

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }

  async postNewMatch(match: INewMatch):Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.postNewMatch(match);

    if (!newMatch) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    return { status: 'SUCCESSFUL', data: newMatch };
  }
}

export default MatchService;

// const test = new MatchService();

// const funçãoAssincrona = async () => {
//   const data = await test.findAllMatchesWithTeams();
//   console.log(data);
// };

// funçãoAssincrona();
