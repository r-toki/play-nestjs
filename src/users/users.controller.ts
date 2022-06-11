import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsersCollection } from 'src/fire/collections/users';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersCollection) private readonly usersCollection: UsersCollection) {}

  @Get()
  findAll() {
    return this.usersCollection
      .findManyByQuery((ref) => ref)
      .then((docs) => docs.map((d) => d.data));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersCollection.findOneById(id).then((d) => d?.data);
  }
}
