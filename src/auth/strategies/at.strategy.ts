import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersCollection } from '../../fire/collections';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private usersCollection: UsersCollection) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('AT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersCollection.findOne(payload.sub);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
