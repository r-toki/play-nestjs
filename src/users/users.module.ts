import { Module } from '@nestjs/common';
import { FireModule } from 'src/fire/fire.module';

import { UsersResolver } from './users.resolver';

@Module({ imports: [FireModule], providers: [UsersResolver] })
export class UsersModule {}
