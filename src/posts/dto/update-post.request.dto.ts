import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
