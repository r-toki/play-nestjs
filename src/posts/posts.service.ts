import { Injectable } from '@nestjs/common';

import { JwtPayload } from '../auth/types';
import { PostDoc } from '../fire/documents';
import { CreatePostRequest } from './dto';

@Injectable()
export class PostsService {
  async create(user: JwtPayload, dto: CreatePostRequest) {
    const post = PostDoc.create(user.postsCollection, {
      title: dto.title,
      body: dto.body,
      userId: user.id,
    });
    await post.save();

    return post.serialized;
  }
}
