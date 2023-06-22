import { IMatchTeam } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import MatchModel from '../models/MatchModel';

class MatchService {
  private matchModel = new MatchModel();

  async findAllMatchesWithTeams():Promise<ServiceResponse<IMatchTeam[]>> {
    const matchesWithTeams = await this.matchModel.findAllMatchesWithTeams();

    return { status: 'SUCCESSFUL', data: matchesWithTeams };
  }
}

export default MatchService;

// const test = new MatchService();

// const funçãoAssincrona = async () => {
//   const data = await test.findAllMatchesWithTeams();
//   console.log(data);
// };

// funçãoAssincrona();
