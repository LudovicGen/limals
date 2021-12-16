import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public readonly jwtSecret: string = process.env.JWT_SECRET;

  public readonly salt: string = process.env.SALT;
}
