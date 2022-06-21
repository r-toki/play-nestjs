import { Timestamp } from 'firebase-admin/firestore';

import { PostsCollection } from '../collections';
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
}
