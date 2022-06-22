import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

const envFilePath = process.env.NODE_ENV !== 'production' ? '.env.development' : '.env';

@Module({ imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }), AuthModule] })
export class AppModule {}
