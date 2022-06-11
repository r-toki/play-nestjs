import { Controller, Get, Inject, Param } from '@nestjs/common';

import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  @Inject(PlayerService)
  private readonly service: PlayerService;

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id).then((e) => e.data);
  }
}
