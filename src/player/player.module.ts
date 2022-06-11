import { Module } from '@nestjs/common';
import { FireModule } from 'src/fire/fire.module';
import { ItemModule } from 'src/item/item.module';

import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [ItemModule, FireModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
