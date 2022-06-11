import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UsersCollection } from 'src/fire/collections/users';

import { User } from './models/user.model';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersCollection: UsersCollection) {}

  @Query(() => [User])
  users() {
    return this.usersCollection.findManyByQuery((ref) => ref);
  }

  @Query(() => User)
  user(@Args('id', { type: () => ID }) id: string) {
    return this.usersCollection.findOne(id);
  }
}
