import { Inject, Injectable } from '@nestjs/common';
import { UsersCollection } from 'src/fire/collections/users';

@Injectable()
export class PlayerService {
  @Inject(UsersCollection)
  private readonly usersCollection: UsersCollection;

  public findById(id: string) {
    return this.usersCollection.findOne(id);
  }
}
