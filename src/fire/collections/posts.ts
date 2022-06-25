import { Injectable } from '@nestjs/common';
import { CollectionReference } from 'firebase-admin/firestore';

import { PostData, PostDoc } from '../documents';
import { FireApp } from '../fire-app';
import { AppFireCollection, AppFireCollectionGroup } from '../lib';

export class PostsCollection extends AppFireCollection<PostData, PostDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new PostDoc(snap));
  }
}

@Injectable()
export class PostsCollectionGroup extends AppFireCollectionGroup<PostData, PostDoc> {
  constructor(app: FireApp) {
    super(app.db.collectionGroup('posts'), '__id', (snap) => new PostDoc(snap));
  }

  findAll() {
    return this.findManyByQuery((ref) => ref.orderBy('createdAt', 'desc'));
  }
}
