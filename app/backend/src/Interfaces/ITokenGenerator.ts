export interface ITokenGenerator {
  gerToken<T extends object>(payload:T):string;
  verifyToken<T extends object>(token:string):(T | null);
}
