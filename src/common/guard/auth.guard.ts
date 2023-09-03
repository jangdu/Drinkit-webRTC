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

    let accessToken;
    let refreshToken;

    client.request.headers.cookie?.split('; ').forEach((cookie) => {
      const datas = cookie.split('=');
      datas[0] === 'AccessToken'
        ? (accessToken = datas[1].replace('Bearer%20', ''))
        : datas[0] === 'RefreshToken'
        ? (refreshToken = datas[1].replace('Bearer%20', ''))
        : null;
    });

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
