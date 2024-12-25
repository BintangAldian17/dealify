import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtpayload';
import { Inject, Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';
import jwtRefreshConfig from '../config/jwt-refresh.config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtRefreshConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof jwtRefreshConfig>,
  ) {
    super({
      jwtFromRequest: JwtRefreshStrategy.extractJWT,
      secretOrKey: refreshJwtConfiguration.secret,
    });
  }
  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'user_token' in req.cookies &&
      req.cookies.user_token.length > 0
    ) {
      return req.cookies.user_token;
    }
    return null;
  }

  validate(payload: AuthJwtPayload) {
    return { email: payload.sub };
  }
}
