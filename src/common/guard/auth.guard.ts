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

    const accessToken = client.request.headers?.AccessToken?.replace(
      'Bearer ',
      '',
    );

    if (!accessToken) throw new UnauthorizedException('Please login first');

    const payload = this.jwtVerify(accessToken);

    if (!payload) {
      const refreshToken = client.request.headers?.RefreshToken?.replace(
        'Bearer ',
        '',
      );

      if (!refreshToken) throw new UnauthorizedException('Please login first');

      const refreshPayload = this.jwtVerify(accessToken);

      if (!refreshPayload)
        throw new UnauthorizedException('Please login again');

      client.User = refreshPayload;
      return true;
    }
    client.User = payload;

    return true;
  }

  jwtVerify(token: string): string | jwt.JwtPayload | boolean {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS, {
        ignoreExpiration: false,
      });
      return payload;
    } catch (e) {
      return false;
    }
  }
}
