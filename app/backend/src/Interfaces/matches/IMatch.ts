export interface IMatch {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type IMatchGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type IMatchTeam = IMatch & {
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
};

export interface INewMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
}
