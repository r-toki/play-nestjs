import { Module } from '@nestjs/common';

import { UsersCollection } from './collections/users';
import { FireApp } from './fire-app';

@Module({
  providers: [FireApp, UsersCollection],
  exports: [UsersCollection],
})
export class FireModule {}
