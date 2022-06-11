import { Injectable } from '@nestjs/common';
import { FireCollection } from 'fire-hose-admin';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

import { UserData, UserDoc } from '../documents/user';

@Injectable()
export class UsersCollection extends FireCollection<UserData, UserDoc> {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {
    super(firebase.db.collection('users'), (snap) => new UserDoc(snap));
  }
}
