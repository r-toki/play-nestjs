import { Injectable } from '@nestjs/common';

import { UserData, UserDoc } from '../documents';
import { FireApp } from '../fire-app';
import { AppFireCollection } from '../lib';

@Injectable()
export class UsersCollection extends AppFireCollection<UserData, UserDoc> {
  constructor(app: FireApp) {
    super(app.db.collection('users'), (snap) => new UserDoc(snap));
  }

  async findOneByEmail(email: string) {
    const docs = await this.findManyByQuery((ref) => ref.where('email', '==', email));
    return docs.length > 0 ? docs[0] : undefined;
  }
}
