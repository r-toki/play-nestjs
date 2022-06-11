import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FireModule } from './fire/fire.module';
import { ItemModule } from './item/item.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    PlayerModule,
    ItemModule,
    ConfigModule.forRoot({
      envFilePath:
        (process.env.NODE_ENV !== 'production' && '.env.development') ||
        undefined,
    }),
    FirebaseModule.forRoot({}),
    FireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
