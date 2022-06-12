import { Injectable, Scope } from '@nestjs/common';
import { FireCollection } from 'fire-hose-admin';

import { UserData, UserDoc } from '../documents/user';
import { FireApp } from '../fire-app';

@Injectable({ scope: Scope.REQUEST })
export class UsersCollection extends FireCollection<UserData, UserDoc> {
  constructor(app: FireApp) {
    super(app.db.collection('users'), (snap) => new UserDoc(snap));
  }
}
