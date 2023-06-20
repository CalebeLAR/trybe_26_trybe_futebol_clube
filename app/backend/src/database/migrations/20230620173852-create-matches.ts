import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatch } from '../../Interfaces/matches/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      homeTeamId: {
        field: 'home_team_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      awayTeamId: {
        field: 'away_team_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: DataTypes.INTEGER,
        allowNull: false,
        
      },
      inProgress: {
        field: 'in_progress',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};