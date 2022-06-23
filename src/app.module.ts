import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards/at.guard';
import { PostsModule } from './posts/posts.module';

const envFilePath = process.env.NODE_ENV !== 'production' ? '.env.development' : '.env';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }), AuthModule, PostsModule],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
