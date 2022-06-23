import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { GetCurrentUserId } from '../common/decorators';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@GetCurrentUserId() userId: string, @Body() dto: CreatePostDto) {
    console.log('--- userId ---');
    console.log(userId);
    console.log('--- dto ---');
    console.log(dto);
    return;
  }
}
