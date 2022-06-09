import { Module } from '@nestjs/common';
import { ItemModule } from 'src/item/item.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

@Module({
  imports: [ItemModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
