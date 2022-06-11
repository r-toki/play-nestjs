import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FireModule } from './fire/fire.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        (process.env.NODE_ENV !== 'production' && '.env.development') ||
        undefined,
    }),
    FireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
