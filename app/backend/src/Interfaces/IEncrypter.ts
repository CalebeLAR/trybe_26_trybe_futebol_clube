export interface IEncrypeter {
  encrypt(password: string): Promise<string>
}
