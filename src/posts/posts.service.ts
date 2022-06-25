import { Injectable } from '@nestjs/common';

import { JwtPayload } from '../auth/types';
import { PostsCollectionGroup } from '../fire/collections';
import { PostDoc } from '../fire/documents';
import { CreatePostRequest, UpdatePostRequest } from './dto';

@Injectable()
export class PostsService {
  constructor(private postsCollectionGroup: PostsCollectionGroup) {}

  async findAll() {
    return this.postsCollectionGroup.findAll().then((a) => a.map((e) => e.serialized));
  }

  async findOne(id: string) {
    return this.postsCollectionGroup.findOne(id).then((e) => e.serialized);
  }

  async create(user: JwtPayload, dto: CreatePostRequest) {
    const post = PostDoc.create(user.postsCollection, {
      title: dto.title,
      body: dto.body,
      userId: user.id,
    });
    await post.save();

    return post.serialized;
  }

  async update(user: JwtPayload, id: string, dto: UpdatePostRequest) {
    const post = await user.postsCollection.findOne(id);
    post.update(dto);
    await post.save();

    return post.serialized;
  }

  async delete(user: JwtPayload, id: string) {
    const post = await user.postsCollection.findOne(id);
    await post.delete();
  }
}
