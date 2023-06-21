import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMocks from './mocks/matches.mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('#MATCHES', async function () {
  afterEach(function () { sinon.restore(); });
    describe('testa endpoint GET /matches', async function() {
      it('deve retornar um status 200 e uma lista de partidas', async function() {
        // arrange
        const { matchesWithTeams } = matchesMocks.matchesLists;
        const findAllReturn = MatchModel.build(matchesWithTeams);

        sinon.stub(SequelizeMatch, 'findAll').resolves(findAllReturn);
        // act
        const httpResponse = await chai.request(app).get('/matches').send(findAllReturn);

        // assert
        expect(httpResponse.status).to.be.equal(401);
        expect(httpResponse.body.data).to.deep.equal(matchesWithTeams);
      });
    });
});
