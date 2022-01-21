import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthTokenDto } from '../dtos';
import { pbkdf2Sync } from 'crypto';
import { ConfigService } from 'config/config.service';
import { PrismaService } from '../prisma.service';
import { Account } from '@prisma/client';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(
    username: string,
    password: string,
    id: string,
  ): Promise<Account> {
    const hashedPassword = this.hashPassword(password);

    const account = { username, password: hashedPassword };
    const result = await this.prisma.account.create({ data: account });
    return result;
  }

  public async login(
    username: string,
    password: string,
  ): Promise<AuthTokenDto> {
    const user = await this.prisma.account.findUnique({
      where: { username },
    });
    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new BadRequestException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, id, ...trimmedUser } = user;

    // const { data: citizen } = await firstValueFrom(
    //   this.httpService.get<UserDto | undefined>(`/users/${id}`),
    //   );
    //   console.log(user);

    const content = { ...trimmedUser };

    return { token: this.jwtService.sign(content) };
  }

  private hashPassword(password: string): string {
    const hash = pbkdf2Sync(
      password,
      this.configService.salt,
      100_000,
      64,
      'sha512',
    );

    return hash.toString('hex');
  }
}
