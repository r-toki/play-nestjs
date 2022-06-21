import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FireModule } from './fire/fire.module';

const envFilePath = process.env.NODE_ENV !== 'production' ? '.env.development' : undefined;

@Module({
  imports: [ConfigModule.forRoot({ envFilePath }), FireModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
