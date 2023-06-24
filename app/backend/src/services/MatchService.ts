import { IMatchTeam } from '../Interfaces/matches/IMatch';
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
}

export default MatchService;

// const test = new MatchService();

// const funçãoAssincrona = async () => {
//   const data = await test.findAllMatchesWithTeams();
//   console.log(data);
// };

// funçãoAssincrona();
