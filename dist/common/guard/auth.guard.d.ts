import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
export declare class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    jwtVerifyAccess(token: string): string | jwt.JwtPayload | boolean;
    jwtVerifyRefresh(token: string): string | jwt.JwtPayload | boolean;
}
