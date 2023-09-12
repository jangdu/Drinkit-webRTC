import { Request } from 'express';
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
    const client = context.switchToWs().getClient();

    const tokens = client.handshake.auth;

    const accessToken = tokens.accessToken.split(' ')[1];
    const refreshToken = tokens.refreshToken.split(' ')[1];

    if (!accessToken) throw new UnauthorizedException('Please login first');

    const payload = this.jwtVerifyAccess(accessToken);

    if (!payload) {
      const refreshPayload = this.jwtVerifyRefresh(refreshToken);
      if (!refreshPayload)
        throw new UnauthorizedException('Please login again');
      client.User = refreshPayload;
      return true;
    }

    client.User = payload;
    return true;
  }

  jwtVerifyAccess(token: string): string | jwt.JwtPayload | boolean {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS, {
        ignoreExpiration: false,
      });
      return payload;
    } catch (e) {
      return false;
    }
  }

  jwtVerifyRefresh(token: string): string | jwt.JwtPayload | boolean {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_REFRESH, {
        ignoreExpiration: false,
      });
      return payload;
    } catch (e) {
      return false;
    }
  }
}
