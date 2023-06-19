import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const sequeliseUser = await this.model.findOne({ where: { email } });

    if (!sequeliseUser) return null;

    const user: IUser = {
      id: sequeliseUser.id,
      email: sequeliseUser.email,
      password: sequeliseUser.password,
      username: sequeliseUser.username,
      role: sequeliseUser.role,
    };

    return user;
  }
}
