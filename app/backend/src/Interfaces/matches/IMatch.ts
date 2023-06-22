import { ITeam } from '../teams/ITeam';

export interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type IMatchTeam = IMatch & {
  homeTeam: Omit<ITeam, 'id'>,
  awayTeam: Omit<ITeam, 'id'>,
};
