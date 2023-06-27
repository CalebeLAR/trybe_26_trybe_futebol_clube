import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import mockTeams from './mocks/teams.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('#LEADERBOARD', async function () {
  afterEach(function () { sinon.restore(); });
  describe('testa endpoint GET /leaderboard/home', async function () {
    it('deve retornar um status 200 e uma lista com todas as informações das partidas finalizadas pelos times da casa');
    it('deve ser capaz de filtrar as classificações dos times da casa também pelos atributos de goalsBalance e efficiency');
    it('filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional')
  });
});
