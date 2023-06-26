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

describe('#TEAMS', async function () {
  afterEach(function () { sinon.restore(); });
  describe('testa endpoint GET /teams', async function () {
    it('deve retornar um status 200 e uma lista com os times', async function () {
      // arrange
      const teams = mockTeams.teams;
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any)

      // act
      const httpResponse = await chai.request(app).get('/teams').send();

      // assert
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.be.deep.eq(teams)
    });
  });

  describe('testa endpoint GET /teams/:id', async function () {
    it('deve retornar um status 200 e o time com o id procurado', async function () {
      // arrange
      const [team] = mockTeams.teams
      const idParam = '1';
      sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

      // act
      const httpResponse = await chai.request(app).get(`/teams/${idParam}`);

      // assert
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.be.deep.eq(team)
    });
    it('deve retornar um status 404 e uma message com "tean not found" caso receba um id inexistente', async function () {
      // arrange
      const [team] = mockTeams.teams
      const idParam = '9999';
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

      // act
      const httpResponse = await chai.request(app).get(`/teams/${idParam}`);

      // assert
      expect(httpResponse.status).to.be.eq(404);
      expect(httpResponse.body).to.be.deep.eq({ message: 'team not found' })
    });
  });
});
