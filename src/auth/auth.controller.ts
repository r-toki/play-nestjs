import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '../common/decorators';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/sign-up')
  signUpLocal(@Body() dto: SignUpRequest) {
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post('local/sign-in')
  signInLocal(@Body() dto: SignInRequest) {
    return this.authService.signInLocal(dto);
  }
}
