import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersCollection } from './collections/users';
import { FireApp } from './fire-app';

@Module({
  imports: [ConfigModule],
  providers: [FireApp, UsersCollection],
  exports: [UsersCollection],
})
export class FireModule {}
