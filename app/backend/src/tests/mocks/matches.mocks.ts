import { query } from "express"
import { InterceptResolutionAction } from "puppeteer"

const matchesLists = {
  matchesWithTeams: [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    },
    {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: {
        teamName: 'Internacional'
      },
      awayTeam: {
        teamName: 'Santos'
      }
    },
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Internacional"
      }
    },
  ],
  InProgressMatches: [
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: 'São Paulo'
      },
      awayTeam: {
        teamName: 'Internacional'
      }
    },
    {
      id: 42,
      homeTeamId: 6,
      homeTeamGoals: 1,
      awayTeamId: 1,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: 'Ferroviária'
      },
      awayTeam: {
        teamName: 'Avaí/Kindermann'
      }
    }
  ],
  ComplatedMatches:[
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'São Paulo'
      },
      awayTeam: {
        teamName: 'Grêmio'
      }
    },
    {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'Internacional'
      },
      awayTeam: {
        teamName: 'Santos'
      }
    }
  ],
}

const match = {
  id: 1,
  homeTeamGoals: 5,
  awayTeamGoals: 7,
  awayTeamId: 8,
  homeTeamId: 16,
  inProgress: false
}

export default {
  matchesLists,
  match,
}