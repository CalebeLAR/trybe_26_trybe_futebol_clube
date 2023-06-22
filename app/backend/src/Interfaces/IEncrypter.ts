export interface IEncrypeter {
  // encrypt(password: string): Promise<string>
  compare(password: string, hash: string): Promise<boolean>
}
