import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: SignUpRequest) {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post('local/sign-in')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: SignInRequest) {
    return this.authService.signInLocal(dto);
  }
}
