import { Injectable } from '@nestjs/common';

import { UserData, UserDoc } from '../documents/user';
import { FireApp } from '../fire-app';
import { AppFireCollection } from '../lib';

@Injectable()
export class UsersCollection extends AppFireCollection<UserData, UserDoc> {
  constructor(app: FireApp) {
    super(app.db.collection('users'), (snap) => new UserDoc(snap));
  }
}
