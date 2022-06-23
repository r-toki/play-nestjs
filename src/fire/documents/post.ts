import { Timestamp } from 'firebase-admin/firestore';

import { PostsCollection } from '../collections';
import { AppFireDocument } from '../lib';

export interface PostData {
  __id: string;
  title: string;
  body: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}
export interface PostDoc extends PostData {}
export class PostDoc extends AppFireDocument<PostData> {
  static create(
    collection: PostsCollection,
    { title, body, userId }: Pick<PostData, 'title' | 'body' | 'userId'>,
  ) {
    const id = collection.ref.doc().id;
    const createdAt = Timestamp.now();
    return new PostDoc(
      this.makeConstructorInput(collection, id, {
        __id: id,
        title,
        body,
        createdAt,
        updatedAt: createdAt,
        userId,
      }),
    );
  }
}
