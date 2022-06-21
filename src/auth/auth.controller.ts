import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/sign-up')
  signUpLocal(@Body() dto: AuthDto) {
    return this.authService.signUpLocal(dto);
  }
}
