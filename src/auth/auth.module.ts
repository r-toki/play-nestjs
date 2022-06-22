import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { FireModule } from '../fire/fire.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [FireModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
