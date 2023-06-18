import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findOne(mail: string, pass: string): Promise<IUser | null> {
    const sequeliseUser = await this.model.findOne({
      where: { email: mail, password: pass },
    });

    if (!sequeliseUser) return null;

    const { email, id, password, role, username }: IUser = sequeliseUser;
    return { email, id, password, role, username };
  }
}
