import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostsCollectionGroup } from './collections';
import { UsersCollection } from './collections/users';
import { FireApp } from './fire-app';

@Module({
  imports: [ConfigModule],
  providers: [FireApp, UsersCollection, PostsCollectionGroup],
  exports: [UsersCollection, PostsCollectionGroup],
})
export class FireModule {}
