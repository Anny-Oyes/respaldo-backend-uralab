import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() payload: AuthDto) {
    return await this.authService.signIn(payload);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  test() {
    return 'test';
  }
}
