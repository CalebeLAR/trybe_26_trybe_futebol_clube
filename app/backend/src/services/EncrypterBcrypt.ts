import * as bcrypt from 'bcryptjs';
import { IEncrypeter } from '../Interfaces/IEncrypter';

export default class Encrypet implements IEncrypeter {
  private bcrypt = bcrypt;

  async encrypt(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(password, 10);
    return hash;
  }
}
