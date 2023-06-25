import { IMatch, IMatchGoals, IMatchTeam } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import MatchModel from '../models/MatchModel';
import TokenGenerator from './TokenGenerateJWT';
import { IUser } from '../Interfaces/users/IUser';

class MatchService {
  private matchModel = new MatchModel();
  private tokerGenerator = new TokenGenerator();

  async findAllMatchesWithTeams():Promise<ServiceResponse<IMatchTeam[]>> {
    const matchesWithTeams = await this.matchModel.findAllMatchesWithTeams();

    return { status: 'SUCCESSFUL', data: matchesWithTeams };
  }

  async findAllInProgressMatches(inProgress: boolean):Promise<ServiceResponse<IMatchTeam[]>> {
    const inProgressMatches = await this.matchModel.fetchInProgressMatches(inProgress);

    return { status: 'SUCCESSFUL', data: inProgressMatches };
  }

  async finishMatch(id: number, token: string):Promise<ServiceResponse<string>> {
    const payload = this.tokerGenerator.verifyToken<IUser>(token);

    if (!payload) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    await this.matchModel.finishMatch(id);

    return { status: 'SUCCESSFUL', data: 'Finished' };
  }

  async updateMatch(id:number, match: IMatchGoals, token:string)
    :Promise<ServiceResponse<IMatch>> {
    const payload = this.tokerGenerator.verifyToken<IUser>(token);

    if (!payload) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    await this.matchModel.updateMatch(id, match);
    const updatedMatch = await this.matchModel.findMatchByPk(id);

    if (!updatedMatch) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: updatedMatch };
  }
}

export default MatchService;

// const test = new MatchService();

// const funçãoAssincrona = async () => {
//   const data = await test.findAllMatchesWithTeams();
//   console.log(data);
// };

// funçãoAssincrona();
