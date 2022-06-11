import { Inject, Injectable } from '@nestjs/common';
import { FireCollection } from 'fire-hose-admin';

import { UserData, UserDoc } from '../documents/user';
import { FireApp } from '../fire-app';

@Injectable()
export class UsersCollection extends FireCollection<UserData, UserDoc> {
  constructor(@Inject(FireApp) private readonly app: FireApp) {
    super(app.db.collection('users'), (snap) => new UserDoc(snap));
  }
}
