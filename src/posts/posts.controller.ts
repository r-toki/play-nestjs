import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { JwtPayload } from '../auth/types';
import { GetCurrentUser } from '../common/decorators';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@GetCurrentUser() user: JwtPayload, @Body() dto: CreatePostDto) {
    console.log('--- userId ---');
    console.log(user.data);
    console.log('--- dto ---');
    console.log(dto);
    return;
  }
}
