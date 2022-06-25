import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
