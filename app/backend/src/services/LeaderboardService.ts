import { IMatchTeam } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

class LeaderboardService {
  private matchModel = new MatchModel();
  private teamModel = new TeamModel();
  private leaderboardModel = 'model';

  static calculateTotalPoints(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);
    const vitories = playedMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    const draws = playedMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalVitoriesPoints = vitories.length * 3;
    const totalDrawsPoints = draws.length;

    return totalVitoriesPoints + totalDrawsPoints;
  }

  static calculateTotalGamePlayed(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);

    return playedMatches.length;
  }

  static calculateTotalVictories(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);
    const vitories = playedMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);

    return vitories.length;
  }

  static calculateTotalDrawls(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);
    const draws = playedMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

    return draws.length;
  }

  static calculateTotalLosses(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);
    const losses = playedMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

    return losses.length;
  }

  static calculateTotalGoalsFavor(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);
    const homeTeamsGoalsArray = playedMatches.map((match) => match.homeTeamGoals);
    const totalGoals = homeTeamsGoalsArray.reduce((sum, goals) => sum + goals);

    return totalGoals;
  }

  static calculateTotalGoalsOwn(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.homeTeam.teamName === teamName);
    const homeTeamsGoalsArray = playedMatches.map((match) => match.awayTeamGoals);
    const totalGoals = homeTeamsGoalsArray.reduce((sum, goals) => sum + goals);

    return totalGoals;
  }

  async getHomeTeamPerformanceInformation():Promise<ServiceResponse<object[]>> {
    const listMatches = await this.matchModel.fetchInProgressMatches(false);
    const listTeams = await this.teamModel.findAll();

    const loadBord = listTeams.map(({ teamName }) => ({
      name: teamName,
      totalPoints: LeaderboardService.calculateTotalPoints(listMatches, teamName),
      totalGames: LeaderboardService.calculateTotalGamePlayed(listMatches, teamName),
      totalVictories: LeaderboardService.calculateTotalVictories(listMatches, teamName),
      totalDraws: LeaderboardService.calculateTotalDrawls(listMatches, teamName),
      totalLosses: LeaderboardService.calculateTotalLosses(listMatches, teamName),
      goalsFavor: LeaderboardService.calculateTotalGoalsFavor(listMatches, teamName),
      goalsOwn: LeaderboardService.calculateTotalGoalsOwn(listMatches, teamName),
    }));
    return { status: 'SUCCESSFUL', data: loadBord };
  }
}

export default LeaderboardService;
