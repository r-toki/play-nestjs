import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { JwtPayload } from '../auth/types';
import { GetCurrentUser } from '../common/decorators';
import { CreatePostRequest, CreatePostResponse } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne() {}

  @Post()
  async create(
    @GetCurrentUser() user: JwtPayload,
    @Body() dto: CreatePostRequest,
  ): Promise<CreatePostResponse> {
    return this.postsService.create(user, dto);
  }

  @Put(':id')
  async update() {}

  @Delete(':id')
  async delete() {}
}
