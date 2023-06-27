import { IMatchTeam } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ILeadBoard } from '../Interfaces/leadBoard/ILeadBoard';

class LeaderboardHomeService {
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

  static calculateEfficiency(listMatches: IMatchTeam[], teamName:string) {
    const totalPoints = LeaderboardHomeService.calculateTotalPoints(listMatches, teamName);
    const totalGames = LeaderboardHomeService.calculateTotalGamePlayed(listMatches, teamName);
    if (totalGames <= 0) return '1.00';

    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    const fixEfficiency = efficiency.toFixed(2);
    return fixEfficiency;
  }

  static calculateGoalsBalance(listMatches: IMatchTeam[], teamName:string) {
    const goalsFavor = LeaderboardHomeService.calculateTotalGoalsFavor(listMatches, teamName);
    const goalsOwn = LeaderboardHomeService.calculateTotalGoalsOwn(listMatches, teamName);
    const goalsBalance = goalsFavor - goalsOwn;

    return goalsBalance;
  }

  static compareByTotalPoints(prevLB:ILeadBoard, nextLB:ILeadBoard) {
    if (prevLB.totalPoints < nextLB.totalPoints) return 1;
    if (prevLB.totalPoints > nextLB.totalPoints) return -1;
    return 0;
  }

  static compareByTotalGoalsBalance(prevLB:ILeadBoard, nextLB:ILeadBoard) {
    if (prevLB.goalsBalance < nextLB.goalsBalance) return 1;
    if (prevLB.goalsBalance > nextLB.goalsBalance) return -1;
    return 0;
  }

  static compareByTotalGoalsFavor(prevLB:ILeadBoard, nextLB:ILeadBoard) {
    if (prevLB.goalsFavor < nextLB.goalsFavor) return 1;
    if (prevLB.goalsFavor > nextLB.goalsFavor) return -1;
    return 0;
  }

  static compareRules(prevLB:ILeadBoard, nextLB:ILeadBoard) {
    const totalPoints = LeaderboardHomeService.compareByTotalPoints(prevLB, nextLB);
    if (totalPoints === 0) {
      const goasBalance = LeaderboardHomeService.compareByTotalGoalsBalance(prevLB, nextLB);

      if (goasBalance === 0) {
        const goalsFavor = LeaderboardHomeService.compareByTotalGoalsFavor(prevLB, nextLB);

        return goalsFavor;
      }
      return goasBalance;
    }
    return totalPoints;
  }

  async getHomeTeamPerformanceInformation():Promise<ServiceResponse<object[]>> {
    const listMatches = await this.matchModel.fetchInProgressMatches(false);
    const listTeams = await this.teamModel.findAll();

    const leadBoard = listTeams.map(({ teamName }) => ({
      name: teamName,
      totalPoints: LeaderboardHomeService.calculateTotalPoints(listMatches, teamName),
      totalGames: LeaderboardHomeService.calculateTotalGamePlayed(listMatches, teamName),
      totalVictories: LeaderboardHomeService.calculateTotalVictories(listMatches, teamName),
      totalDraws: LeaderboardHomeService.calculateTotalDrawls(listMatches, teamName),
      totalLosses: LeaderboardHomeService.calculateTotalLosses(listMatches, teamName),
      goalsFavor: LeaderboardHomeService.calculateTotalGoalsFavor(listMatches, teamName),
      goalsOwn: LeaderboardHomeService.calculateTotalGoalsOwn(listMatches, teamName),
      goalsBalance: LeaderboardHomeService.calculateGoalsBalance(listMatches, teamName),
      efficiency: LeaderboardHomeService.calculateEfficiency(listMatches, teamName),
    }));

    const sortLeadBoard: ILeadBoard[] = leadBoard.sort(
      (prevLB, nextLB) => LeaderboardHomeService.compareRules(prevLB, nextLB),
    );
    return { status: 'SUCCESSFUL', data: sortLeadBoard };
  }
}

export default LeaderboardHomeService;
