import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { IncomingHttpHeaders } from 'http';
import { ConfigService } from '@nestjs/config';

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

  logger = new Logger(AuthnMiddleware.name)

  host = this.config.get('logto.host')
  audienceHost = this.config.get('logto.audience_host')

  enable: boolean
  debug: boolean

  constructor(private config: ConfigService) {
    this.enable = this.config.get('authn.enable') == 'true'
    this.debug = this.config.get('authn.debug') == 'true'
    this.logger.log(`enabled: ${this.enable}, debug: ${this.debug}`)
  }

  async use(req: Request, res: Response, next: NextFunction) {

    const { debug, logger } = this

    if (debug) {
      // logger.debug(req.headers)
      // logger.debug(req.headers['x-userinfo'])
    }

    // get user id from header

    if (req.headers['x-userinfo']) {
      const userInfo = JSON.parse(Buffer.from(req.headers['x-userinfo'].toString(), 'base64').toString('utf-8'))
      const { sub: userId } = userInfo
      // if (debug) logger.debug(userInfo)
      if (debug) logger.debug(`${req.method} ${req.baseUrl} from ${userId}`)
    }

    if (!this.enable) {
      return next()
    }

    // 从请求头中获取令牌
    const token = extractBearerTokenFromHeaders(req.headers);

    const { host, audienceHost } = this

    const audience = audienceHost + req.baseUrl
    // Logger.log(`${req.method} ${req.baseUrl} (${host}, ${audience})`)

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
      Logger.warn(`${req.method} ${req.baseUrl} (${host}, ${audience})`)
      throw new UnauthorizedException(e)
    }

  }
}
