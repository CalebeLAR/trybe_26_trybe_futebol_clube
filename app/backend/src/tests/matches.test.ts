import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMocks from './mocks/matches.mocks';

import { Response } from 'superagent';
import MatchModel from '../models/MatchModel';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('#MATCHES', async function () {
  afterEach(function () { sinon.restore(); });
    describe('testa endpoint GET /matches', async function() {
      it('deve retornar um status 200 e uma lista de partidas', async function() {
        // arrange
        const { matchesWithTeams } = matchesMocks.matchesLists;

        sinon.stub(SequelizeMatch, 'findAll').resolves(matchesWithTeams as any);
        // act 
        const httpResponse = await chai.request(app).get('/matches').send(matchesWithTeams);

        // assert
        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(matchesWithTeams);
      });
      it('deve retornar um status 200 e uma lista de partidas em andamento, caso receba a query inProgress=true', async function() {
        // arrange
        const { InProgressMatches } = matchesMocks.matchesLists;

        sinon.stub(SequelizeMatch, 'findAll').resolves(InProgressMatches as any);
        // act 
        const httpResponse = await chai.request(app).get('/matches').query({inProgress: 'true'});

        // assert
        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(InProgressMatches);
      });
      it('deve retornar um status 200 e uma lista de partidas finalizadas, caso receba a query inProgress=false', async function() {
        // arrange
        const { ComplatedMatches } = matchesMocks.matchesLists;

        sinon.stub(SequelizeMatch, 'findAll').resolves(ComplatedMatches as any);
        // act 
        const httpResponse = await chai.request(app).get('/matches').query({inProgress: 'false'});

        // assert
        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.deep.equal(ComplatedMatches);
      });
    });
});
