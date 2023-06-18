export interface ITokenGenerator {
  gerToken<T extends object>(payload:T):string;
}
