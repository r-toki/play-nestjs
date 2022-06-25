import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { JwtPayload } from '../auth/types';
import { GetCurrentUser } from '../common/decorators';
import { CreatePostRequest, CreatePostResponse } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUser() user: JwtPayload,
    @Body() dto: CreatePostRequest,
  ): Promise<CreatePostResponse> {
    return this.postsService.create(user, dto);
  }
}
