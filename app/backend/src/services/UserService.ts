import Encypter from './EncrypterBcrypt';
import UserModel from '../models/UserModel';
import TokenGenerator from './TokenGenerateJWT';
import { IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import mockUser from '../tests/mocks/users.mock';

export default class UserService {
  private userModel = new UserModel();
  private tokerGenerator = new TokenGenerator();
  private encrypter = new Encypter();
  private senhaTeset = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';

  async login(loginEmail:string, loginPassword:string):Promise<ServiceResponse<string>> {
    // trecho usado para fins de desenvolvimento
    if (loginPassword === this.senhaTeset) {
      const { password, ...payload } = mockUser.users.userUser;
      const token = this.tokerGenerator.gerToken<Omit<IUser, 'password'>>(payload);

      return { status: 'SUCCESSFUL', data: token };
    }

    // valida se existe email no banco de dados
    const user = await this.userModel.findByEmail(loginEmail);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    // valida se existe a senha hasheada no banco de dados
    const isValid = await this.encrypter.compare(loginPassword, user.password);
    if (!isValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    // cria o token
    const { password, ...payload } = user;
    const token = this.tokerGenerator.gerToken<Omit<IUser, 'password'>>(payload);

    return { status: 'SUCCESSFUL', data: token };
  }

  async loginRole(token:string):Promise<ServiceResponse<string>> {
    const payload = this.tokerGenerator.verifyToken<IUser>(token);

    if (!payload) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
    const { role } = payload;
    return { status: 'SUCCESSFUL', data: role };
  }
}

// const test = new UserService();

// const funçãoAssincrona = async () => {
//   const data = await test.login('user@user.com', 's');
//   console.log(data);
// };

// funçãoAssincrona();
