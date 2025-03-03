import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import mockUser from './mocks/users.mock';

import { Response } from 'superagent';
import TokenGenerator from '../services/TokenGenerateJWT';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs'

chai.use(chaiHttp);

const { expect } = chai;

describe('#USERS', async function () {
  afterEach(function () { sinon.restore(); });
  describe('testa endpoint POST /login', async function () {
    it('deve retornar um status 200 e um token caso receba um login valido', async function () {
      // arrange
      const { validLogin } = mockUser.logins;
      const { userUser } = mockUser.users;
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.etc.etc'
      sinon.stub(bcryptjs, 'compare').resolves(true);
      sinon.stub(jsonwebtoken, 'sign').returns(token as any)
      sinon.stub(SequelizeUser, 'findOne').resolves(userUser as any);

      // act
      const httpResponse = await chai.request(app).post('/login').send(validLogin);

      // assert
      expect(httpResponse.status).to.be.eq(200)
      expect(httpResponse.body.token).to.be.eq(token);
    });
    it('deve retornar um status 400 e uma mensagem "All fields must be filled" caso não receba um campo email', async function () {
      // arrange
      const { withoutAnEmailField } = mockUser.logins.invalidLogin;

      // act
      const httpResponse = await chai.request(app).post('/login').send(withoutAnEmailField);

      // assert
      expect(httpResponse.status).to.be.eq(400)
      expect(httpResponse.body).to.be.deep.eq({message: 'All fields must be filled'});
    });
    it('deve retornar um status 400 e uma mensagem "All fields must be filled" caso não receba um campo password', async function () {
      // arrange
      const { withoutAPasswordField } = mockUser.logins.invalidLogin;

      // act
      const httpResponse = await chai.request(app).post('/login').send(withoutAPasswordField);

      // assert
      expect(httpResponse.status).to.be.eq(400)
      expect(httpResponse.body).to.be.deep.eq({message: 'All fields must be filled'});
    });
    it('deve retornar um status 401 e uma mensagem "Invalid email or password" caso não receba um email existente', async function () {
       // arrange
       const { validLogin } = mockUser.logins;
       sinon.stub(SequelizeUser, 'findOne').resolves(null);
 
       // act
       const httpResponse = await chai.request(app).post('/login').send(validLogin);
 
       // assert
       expect(httpResponse.status).to.be.eq(401)
       expect(httpResponse.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
    it('deve retornar um status 401 e uma mensagem "Invalid email or password" caso não receba uma senha existente', async function () {
      // arrange
      const { validLogin } = mockUser.logins;
      const { userUser } = mockUser.users;
      sinon.stub(bcryptjs, 'compare').resolves(false);
      sinon.stub(SequelizeUser, 'findOne').resolves(userUser as any);

      // act
      const httpResponse = await chai.request(app).post('/login').send(validLogin);

      // assert
      expect(httpResponse.status).to.be.eq(401)
      expect(httpResponse.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
    it('deve retornar um status 401 e uma mensagem "Invalid email or password" caso receba uma senha com menos de 6 digitos', async function () {
      // arrange
      const { passwordFieldLessThanSixDigits } = mockUser.logins.invalidLogin;
      const { userUser } = mockUser.users;
      sinon.stub(bcryptjs, 'compare').resolves(false);
      sinon.stub(SequelizeUser, 'findOne').resolves(userUser as any);

      // act
      const httpResponse = await chai.request(app).post('/login').send(passwordFieldLessThanSixDigits);

      // assert
      expect(httpResponse.status).to.be.eq(401)
      expect(httpResponse.body).to.be.deep.eq({ message: 'Invalid email or password' });
    });
  });
  describe('testa endpoint get /login/role', async function () {
    it('deve retornar um status 200 com um objeto contendo a role do usuário caso a requisição seja feita com um token valido', async function () {
      // arrange
      const validToken = 'tokenValido'
      const payload = { role: 'string' }

      sinon.stub(jsonwebtoken, 'verify').returns(payload as any)
      // act
      const httpResponse = await chai.request(app).get('/login/role').set("authorization", validToken)
      // assert
      expect(httpResponse.status).to.be.eq(200);
      expect(httpResponse.body).to.deep.eq(payload);
    });
    it('deve retornar um status 401 contendo com a mensagem "Token not found" caso a requisição seja feita sem a chave authorization nos headers', async function () {
      // act
      const httpResponse = await chai.request(app).get('/login/role');

      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token not found' });
    });
    it('deve retornar um status 401 com a mensagem "Token must be a valid token" caso a requisição seja feita usando um token inválido', async function () {
      // act
      const httpResponse = await chai.request(app).get('/login/role').set("authorization", 'tokenValido')
      // assert
      expect(httpResponse.status).to.be.eq(401);
      expect(httpResponse.body).to.deep.eq({ message: 'Token must be a valid token' });
    });
  });
});
