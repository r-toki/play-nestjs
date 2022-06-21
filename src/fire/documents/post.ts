import { Timestamp } from 'firebase-admin/firestore';

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
export class PostDoc extends AppFireDocument<PostData> {}
