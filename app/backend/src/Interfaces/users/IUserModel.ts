import { IUser } from './IUser';

export type IUserModel = {
  findOne(email: IUser['email'], password:IUser['password']):Promise<IUser | null>
};
