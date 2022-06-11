import { Module } from '@nestjs/common';

import { UsersCollection } from './collections/users';

@Module({
  providers: [UsersCollection],
  exports: [UsersCollection],
})
export class FireModule {}
