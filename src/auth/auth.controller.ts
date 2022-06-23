import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: SignUpDto) {
    return this.authService.signUpLocal(dto);
  }

  @Post('local/sign-in')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInDto) {
    return this.authService.signInLocal(dto);
  }
}
