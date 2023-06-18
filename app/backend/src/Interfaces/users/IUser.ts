export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
