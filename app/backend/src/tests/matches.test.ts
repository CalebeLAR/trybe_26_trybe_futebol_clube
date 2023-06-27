import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import matchesMocks from './mocks/matches.mocks';

import * as jsonwebtoken from 'jsonwebtoken';
import usersMock from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('#MATCHES', async function () {
  afterEach(function () { sinon.restore(); });
  describe('testa endpoint GET /matches', async function () {
    it('deve retornar um status 200 e uma lista de partidas', async function () {
      // arrange
      const { sequelizeMatchesWithTeams, matchesWithTeams } = matchesMocks.matchesLists;

      sinon.stub(SequelizeMatch, 'findAll').resolves(sequelizeMatchesWithTeams as any);
      // act 
      const httpResponse = await chai.request(app).get('/matches');

      // assert
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(matchesWithTeams);
    });
    it('deve retornar um status 200 e uma lista de partidas em andamento, caso receba a query inProgress=true', async function () {
      // arrange
      const { sequelizeMatchesWithTeams, InProgressMatches } = matchesMocks.matchesLists;
      const SqlzInProgressMatches = sequelizeMatchesWithTeams.filter((smt)=> smt.inProgress);

      sinon.stub(SequelizeMatch, 'findAll').resolves(SqlzInProgressMatches as any);
      // act 
      const httpResponse = await chai.request(app).get('/matches').query({ inProgress: 'true' });

      // assert
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(InProgressMatches);
    });
    it('deve retornar um status 200 e uma lista de partidas finalizadas, caso receba a query inProgress=false', async function () {
      // arrange
      const { sequelizeMatchesWithTeams, ComplatedMatches } = matchesMocks.matchesLists;
      const SqlzFinishedMatches = sequelizeMatchesWithTeams.filter((smt)=> !smt.inProgress);

      sinon.stub(SequelizeMatch, 'findAll').resolves(SqlzFinishedMatches as any);
      // act 
      const httpResponse = await chai.request(app).get('/matches').query({ inProgress: 'false' });

      // assert
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(ComplatedMatches);
    });
  });
  describe('testa endpoint PATCH /matches/:id/finish', async function () {
    it('deve retornar um status 200 e uma mensagem "Finished" caso a requisição seja feita com um token valido', async function () {
      // arrange
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const idParam = '1'
      const payload = usersMock.users.userAdmim;

      sinon.stub(jsonwebtoken, 'verify').returns(payload as any);
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`).set("authorization", validToken);

      // assert
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body.message).to.deep.eq('Finished');
    });
    it('deve retornar um status 401 contendo com a mensagem "Token not found" caso a requisição seja feita sem a chave authorization nos headers', async function () {
      // arrange
      const idParam = '1'
      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`);

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token not found' });
    });
    it('deve retornar um status 401 com a mensagem "Token must be a valid token" caso a requisição seja feita usando um token inválido', async function () {
      // arrange
      const inValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const idParam = '1'
      sinon.stub(jsonwebtoken, 'verify').throws()

      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`).set('authorization', inValidToken);

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token must be a valid token' });
    });
  });
  describe('testa endpoint PATCH /matches/:id', async function () {
    it('deve retornar um status 200 com um objeto contendo a partida que foi atualizada caso a requisição seja feita com um token valido', async function () {
      // arrange
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const idParam = '1'
      const payload = usersMock.users.userAdmim;
      const { match } = matchesMocks;
      const sequelizeMatch = SequelizeMatch.build(match);

      sinon.stub(jsonwebtoken, 'verify').returns(payload as any);
      sinon.stub(SequelizeMatch, 'findByPk').resolves(sequelizeMatch);
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}`).set("authorization", validToken).send({ homeTeamGoals: 5, awayTeamGoals: 7 });

      // assert
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.deep.eq({...match, homeTeamGoals: 5, awayTeamGoals: 7});
    });
    it('deve retornar um status 404 com a mensagem "Match not found" caso a requisição seja feita usando um id inexistente', async function () {
      // arrange
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const idParam = '100000'
      const payload = usersMock.users.userAdmim;

      sinon.stub(jsonwebtoken, 'verify').returns(payload as any);
      sinon.stub(SequelizeMatch, 'update').resolves([0]);
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);

      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}`).set("authorization", validToken);

      // assert
      expect(httpResponse.status).to.be.eq(404);
      expect(httpResponse.body.message).to.deep.eq("Match not found");
    });
    it('deve retornar um status 401 com a mensagem "Token not found" caso a requisição seja feita sem a chave authorization nos headers', async function () {
      // arrange
      const idParam = '1'
      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`);

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token not found' });
    });
    it('deve retornar um status 401 com a mensagem "Token must be a valid token" caso a requisição seja feita usando um token inválido', async function () {
      // arrange
      const inValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const idParam = '1'
      sinon.stub(jsonwebtoken, 'verify').throws()

      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`).set('authorization', inValidToken);

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token must be a valid token' });
    });
  });
  describe('testa endpoint POST /matches', async function () {
    it('deve retornar um status 201 com um objeto contendo a partida que foi inserida caso a requisição seja feita com um token valido', async function () {
      // arrange
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const payload = usersMock.users.userAdmim;
      const httpRequest = {
        homeTeamId: 16, 
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      };
      const newMatch = {
        id: 1,
        homeTeamId: 16, 
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
      };

      const sequelizeMatch = SequelizeMatch.build(newMatch);

      sinon.stub(jsonwebtoken, 'verify').returns(payload as any);
      sinon.stub(SequelizeMatch, 'create').resolves(sequelizeMatch);

      // act
      const httpResponse = await chai.request(app).post(`/matches`).set("authorization", validToken).send(httpRequest)
      // assert
      expect(httpResponse.status).to.be.eq(201);
      expect(httpResponse.body).to.deep.eq(newMatch);
    });
    it('deve retornar um status 404 com a mensagem "There is no team with such id!" caso a requisição seja feita usando o id de um time inexistente', async function () {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const payload = usersMock.users.userAdmim;
      const httpRequest = {
        homeTeamId: 99999, 
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      };
      sinon.stub(jsonwebtoken, 'verify').returns(payload as any);
      sinon.stub(SequelizeMatch, 'create').throws();

      // act
      const httpResponse = await chai.request(app).post(`/matches`).set("authorization", validToken).send(httpRequest)
      // assert
      expect(httpResponse.status).to.be.eq(404);
      expect(httpResponse.body.message).to.deep.eq('There is no team with such id!');
    });
    it('deve retornar um status 401 com a mensagem "Token not found" caso a requisição seja feita sem a chave authorization nos headers', async function () {
      // arrange
      const idParam = '1'
      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`);

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token not found' });
    });
    it('deve retornar um status 401 com a mensagem "Token must be a valid token" caso a requisição seja feita usando um token inválido', async function () {
      // arrange
      const inValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      const idParam = '1'
      sinon.stub(jsonwebtoken, 'verify').throws()

      // act
      const httpResponse = await chai.request(app).patch(`/matches/${idParam}/finish`).set('authorization', inValidToken);

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token must be a valid token' });
    });
  });
  
});
