import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';

import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

dotenv.config();

type ValidatePayload = {
  id: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.NODE_ENV === 'test'
          ? `${process.env.JWT_SECRET_TEST}`
          : `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: ValidatePayload): Promise<ValidatePayload> {
    return {
      id: payload.id,
    };
  }
}
