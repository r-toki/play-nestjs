import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
  public getItems() {
    return ['sword', 'axe', 'pants'];
  }
}
