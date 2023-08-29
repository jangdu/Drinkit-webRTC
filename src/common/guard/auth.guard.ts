import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class JwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies?.AccessToken?.replace('Bearer ', '');

    if (!token) throw new UnauthorizedException('Please login first');

    const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS, {
      ignoreExpiration: true,
    });
    /*
      Solution 1. Chatting Server 접근 이전에 Main Server 접근 및 액세스 토큰 재발급 이후 재접근
    */
    request.User = payload;

    return true;
  }
}
