import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from 'src/dtos';

export interface RequestWithUser extends Request {
  user: UserDto;
}

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}
