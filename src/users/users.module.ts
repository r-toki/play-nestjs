import { Module } from '@nestjs/common';
import { FireModule } from 'src/fire/fire.module';

import { UsersController } from './users.controller';

@Module({ imports: [FireModule], controllers: [UsersController] })
export class UsersModule {}
