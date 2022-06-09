import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [PlayerModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
