import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export class EncryptionService {
  saltRounds: number = 10;

  public encrypt(str: string): string {
    const salt = genSaltSync(this.saltRounds);
    return hashSync(str, salt);
  }

  public compare(hashed: string, plain: string) {
    return compareSync(plain, hashed);
  }
}
