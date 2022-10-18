import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { IncomingHttpHeaders } from 'http';

const bearerTokenIdentifier = 'Bearer'

const extractBearerTokenFromHeaders = ({ authorization }: IncomingHttpHeaders) => {
  if (!authorization) {
    // throw new Error({ code: 'auth.authorization_header_missing', status: 401 });
    throw new UnauthorizedException('auth.authorization_header_missing')
  }

  if (!authorization.startsWith('Bearer')) {
    // throw new Error({ code: 'auth.authorization_token_type_not_supported', status: 401 });
    throw new UnauthorizedException('auth.authorization_token_type_not_supported')
  }

  return authorization.slice(bearerTokenIdentifier.length + 1);
};

@Injectable()
export class AuthnMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // 从请求头中获取令牌
    const token = extractBearerTokenFromHeaders(req.headers);

    // Logger.log(`${req.method} ${req.baseUrl} (${token})`)

    const host = 'logto.pocki.cc'
    const audience = 'http://localhost:14201/api/graphql'

    try {
      const { payload } = await jwtVerify(
        token,
        // 使用我们从 Logto OIDC 配置信息中获取的 公共 jwks_uri 提取一个公钥集。
        createRemoteJWKSet(new URL(`https://${host}/oidc/jwks`)),
        {
          // 令牌应由 Logto 服务器发行
          issuer: `https://${host}/oidc`,
          // 该令牌的目标受众应为当前被请求的 API 地址
          audience,
        },
      )

      // 提取 payload 信息
      const userId = payload.sub;

      // Logger.log(`${req.method} ${req.baseUrl} (${userId})`)
      next();
    } catch (e) {
      throw new UnauthorizedException(e)
    }

  }
}