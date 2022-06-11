import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [PlayerModule, ItemModule, FirebaseModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
