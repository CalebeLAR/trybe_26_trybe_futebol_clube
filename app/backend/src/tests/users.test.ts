import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import mockUser from './mocks/users.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('#USERS', async function () {
  afterEach(function () { sinon.restore(); });
  describe('testa endpoint POST /login', async function () {
    it('deve retornar um status 200 e um token caso receba um login valido', async function () {
      // arrange
      const { validLogin } = mockUser.logins;
      const { userUser } = mockUser.users;
      const token = '{dataUser sem senha} ecriptado'

      sinon.stub(SequelizeUser, 'findOne').resolves(userUser as any);
      // act

      const httpResponse = await chai.request(app).post('/login').send(validLogin);
      // assert
      expect(httpResponse.status).to.be.eq(200)
      expect(httpResponse.body.token).to.be.eq(token)
    });
    it('deve retornar um status 400 e uma message "All fields must be filled" caso não receba um campo email', async function () {
      // arrange
      const { loginWithOutEmail } = mockUser.logins;

      // act
      const httpResponse = await chai.request(app).post('/login').send(loginWithOutEmail);

      // assert
      expect(httpResponse.status).to.be.eq(400)
      expect(httpResponse.body.token).to.be.eq({message: 'All fields must be filled'});
    });
    it('deve retornar um status 400 e uma message "All fields must be filled" caso não receba um campo password', async function () {
      // arrange
      const { loginWithOutPassword } = mockUser.logins;

      // act
      const httpResponse = await chai.request(app).post('/login').send(loginWithOutPassword);

      // assert
      expect(httpResponse.status).to.be.eq(400)
      expect(httpResponse.body.token).to.be.eq({message: 'All fields must be filled'});
    });
  });
});
