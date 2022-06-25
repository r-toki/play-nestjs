import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
