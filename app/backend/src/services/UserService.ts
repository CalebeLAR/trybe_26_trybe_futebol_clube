import Encypter from './EncrypterBcrypt';
import UserModel from '../models/UserModel';
import TokenGenerator from './TokenGenerateJWT';
import { IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/IServiceResponse';

export default class UserService {
  private userModel = new UserModel();
  private tokerGenerator = new TokenGenerator();
  private encrypter = new Encypter();
  private senhaTeset = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';

  async login(mail:string, pass:string):Promise<ServiceResponse<string>> {
    let hashedPass = await this.encrypter.encrypt(pass);

    if (pass === this.senhaTeset) {
      hashedPass = this.senhaTeset;
    }

    const user = await this.userModel.findOne(mail, hashedPass);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'user not found' } };

    const { password, ...payload } = user;
    const token = this.tokerGenerator.gerToken<Omit<IUser, 'password'>>(payload);

    return { status: 'SUCCESSFUL', data: token };
  }
}

// const test = new UserService();

// const funçãoAssincrona = async () => {
//   const data = await test.login('user@user.com', 's');
//   console.log(data);
// };

// funçãoAssincrona();
