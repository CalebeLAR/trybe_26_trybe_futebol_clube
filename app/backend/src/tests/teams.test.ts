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

describe('TEAMS tests', async function () {
  beforeEach(function () { sinon.restore(); });

  it('testa endpoint GET /teams ', async function () {
    // arrange
    const teams = mockTeams.teams;
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as SequelizeTeam[])

    // act
    const httpResponse = await chai.request(app).get('/teams').send();

    // assert
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.deep.eq(teams)
  });
});
