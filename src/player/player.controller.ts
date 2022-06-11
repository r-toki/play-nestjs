import { Controller, Get, Inject, Param } from '@nestjs/common';

import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  @Inject(PlayerService)
  private readonly service: PlayerService;

  @Get('find/:id')
  public findPlayerById(@Param('id') id: string) {
    return this.service.findPlayerById(id);
  }
}
