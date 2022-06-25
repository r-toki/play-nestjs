import { Module } from '@nestjs/common';

import { FireModule } from '../fire/fire.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [FireModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
