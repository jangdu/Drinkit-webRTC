"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
class JwtGuard {
    canActivate(context) {
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
        if (!accessToken)
            throw new common_1.UnauthorizedException('Please login first');
        const payload = this.jwtVerifyAccess(accessToken);
        if (!payload) {
            const refreshPayload = this.jwtVerifyRefresh(refreshToken);
            if (!refreshPayload)
                throw new common_1.UnauthorizedException('Please login again');
            client.User = refreshPayload;
            return true;
        }
        client.User = payload;
        return true;
    }
    jwtVerifyAccess(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_ACCESS, {
                ignoreExpiration: false,
            });
            return payload;
        }
        catch (e) {
            return false;
        }
    }
    jwtVerifyRefresh(token) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_REFRESH, {
                ignoreExpiration: false,
            });
            return payload;
        }
        catch (e) {
            return false;
        }
    }
}
exports.JwtGuard = JwtGuard;
//# sourceMappingURL=auth.guard.js.map