import { Request, Response } from 'express';
import { ILoginUser, IUser } from '../Interfaces/users/IUser';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  private userService = new UserService();

  async login(req:Request, res: Response):Promise<Response> {
    const { email, password }: ILoginUser = req.body;

    const { status, data } = await this.userService.login(email, password);
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(mapStatusHTTP(status)).json({ token: data });
  }

  async loginRole(req:Request, res: Response):Promise<Response> {
    const { id, username, role, email } = req.body.payload;

    const payload: Omit<IUser, 'password'> = { id, username, role, email };

    const { status, data } = await this.userService.loginRole(payload);
    // if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);

    return res.status(mapStatusHTTP(status)).json({ role: data });
  }
}
