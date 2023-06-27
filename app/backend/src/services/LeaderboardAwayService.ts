import { IMatchTeam } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ILeadBoard } from '../Interfaces/leadBoard/ILeadBoard';

class LeaderboardAwayService {
  private matchModel = new MatchModel();
  private teamModel = new TeamModel();
  private leaderboardModel = 'model';

  static calculateTotalPoints(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);
    const vitories = playedMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    const draws = playedMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    const totalVitoriesPoints = vitories.length * 3;
    const totalDrawsPoints = draws.length;

    return totalVitoriesPoints + totalDrawsPoints;
  }

  static calculateTotalGamePlayed(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);

    return playedMatches.length;
  }

  static calculateTotalVictories(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);
    const vitories = playedMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);

    return vitories.length;
  }

  static calculateTotalDrawls(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);
    const draws = playedMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);

    return draws.length;
  }

  static calculateTotalLosses(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);
    const losses = playedMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);

    return losses.length;
  }

  static calculateTotalGoalsFavor(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);
    const awayTeamsGoalsArray = playedMatches.map((match) => match.awayTeamGoals);
    const totalGoals = awayTeamsGoalsArray.reduce((sum, goals) => sum + goals);

    return totalGoals;
  }

  static calculateTotalGoalsOwn(listMatches: IMatchTeam[], teamName:string) {
    const playedMatches = listMatches.filter((match) => match.awayTeam.teamName === teamName);
    const awayTeamsGoalsArray = playedMatches.map((match) => match.homeTeamGoals);
    const totalGoals = awayTeamsGoalsArray.reduce((sum, goals) => sum + goals);

    return totalGoals;
  }

  static calculateEfficiency(listMatches: IMatchTeam[], teamName:string) {
    const totalPoints = LeaderboardAwayService.calculateTotalPoints(listMatches, teamName);
    const totalGames = LeaderboardAwayService.calculateTotalGamePlayed(listMatches, teamName);
    if (totalGames <= 0) return '1.00';

    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    const fixEfficiency = efficiency.toFixed(2);
    return fixEfficiency;
  }

  static calculateGoalsBalance(listMatches: IMatchTeam[], teamName:string) {
    const goalsFavor = LeaderboardAwayService.calculateTotalGoalsFavor(listMatches, teamName);
    const goalsOwn = LeaderboardAwayService.calculateTotalGoalsOwn(listMatches, teamName);
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
    const totalPoints = LeaderboardAwayService.compareByTotalPoints(prevLB, nextLB);
    if (totalPoints === 0) {
      const goasBalance = LeaderboardAwayService.compareByTotalGoalsBalance(prevLB, nextLB);

      if (goasBalance === 0) {
        const goalsFavor = LeaderboardAwayService.compareByTotalGoalsFavor(prevLB, nextLB);

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
      totalPoints: LeaderboardAwayService.calculateTotalPoints(listMatches, teamName),
      totalGames: LeaderboardAwayService.calculateTotalGamePlayed(listMatches, teamName),
      totalVictories: LeaderboardAwayService.calculateTotalVictories(listMatches, teamName),
      totalDraws: LeaderboardAwayService.calculateTotalDrawls(listMatches, teamName),
      totalLosses: LeaderboardAwayService.calculateTotalLosses(listMatches, teamName),
      goalsFavor: LeaderboardAwayService.calculateTotalGoalsFavor(listMatches, teamName),
      goalsOwn: LeaderboardAwayService.calculateTotalGoalsOwn(listMatches, teamName),
      goalsBalance: LeaderboardAwayService.calculateGoalsBalance(listMatches, teamName),
      efficiency: LeaderboardAwayService.calculateEfficiency(listMatches, teamName),
    }));

    const sortLeadBoard: ILeadBoard[] = leadBoard.sort(
      (prevLB, nextLB) => LeaderboardAwayService.compareRules(prevLB, nextLB),
    );
    return { status: 'SUCCESSFUL', data: sortLeadBoard };
  }
}

export default LeaderboardAwayService;
