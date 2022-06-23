import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';

import { UsersCollection } from '../fire/collections';
import { UserDoc } from '../fire/documents';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersCollection: UsersCollection,
  ) {}

  async getTokens(userId: string, email: string) {
    const at = await this.jwtService.signAsync(
      { sub: userId, email },
      { secret: this.configService.get<string>('AT_SECRET'), expiresIn: 60 * 15 },
    );
    return { access_token: at };
  }

  async signUpLocal(dto: SignUpDto) {
    const exists = await this.usersCollection.findOneByEmail(dto.email);
    if (exists) throw new ForbiddenError('Email exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = UserDoc.create(this.usersCollection, {
      name: dto.name,
      email: dto.email,
      hashedPassword,
    });
    await user.save();

    return this.getTokens(user.id, user.email);
  }

  async signInLocal(dto: SignInDto) {
    const user = await this.usersCollection.findOneByEmail(dto.email);
    if (!user) throw new ForbiddenError('Access denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!passwordMatches) throw new ForbiddenError('Access denied');

    return this.getTokens(user.id, user.email);
  }
}
