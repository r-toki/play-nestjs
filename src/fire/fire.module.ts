import { Module } from '@nestjs/common';

import { PostsCollectionGroup } from './collections';
import { UsersCollection } from './collections/users';
import { FireApp } from './fire-app';

@Module({
  providers: [FireApp, UsersCollection, PostsCollectionGroup],
  exports: [UsersCollection, PostsCollectionGroup],
})
export class FireModule {}
