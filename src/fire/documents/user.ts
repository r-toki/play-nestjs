import { Timestamp } from 'firebase-admin/firestore';

import { PostsCollection, UsersCollection } from '../collections';
import { AppFireDocument } from '../lib';

export interface UserData {
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
export interface UserDoc extends UserData {}
export class UserDoc extends AppFireDocument<UserData> {
  postsCollection = new PostsCollection(this.ref.collection('posts'));

  get serialized() {
    return {
      ...this.dataWithId,
      createdAt: this.createdAt.toDate().toISOString(),
      updatedAt: this.updatedAt.toDate().toISOString(),
    };
  }

  static create(
    collection: UsersCollection,
    { name, email, hashedPassword }: Pick<UserData, 'name' | 'email' | 'hashedPassword'>,
  ) {
    const createdAt = Timestamp.now();
    return new UserDoc(
      this.makeConstructorInput(collection, null, {
        name,
        email,
        hashedPassword,
        createdAt,
        updatedAt: createdAt,
      }),
    );
  }
}
