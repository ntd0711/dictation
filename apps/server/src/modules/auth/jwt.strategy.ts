import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { parse } from 'cookie';
import { ExtractJwt, Strategy } from 'passport-jwt';
// export const JwtCookieToken = 'access_token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // jwtFromRequest: (req) => {
      //   const cookie = parse(req.headers.cookie ?? '');
      //   return req && cookie?.[JwtCookieToken];
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { id: number; iat: number; exp: number }) {
    const user = await this.authService.getLoggerUser(payload.id);
    return user;
  }
}
