import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@server/modules/auth/dtos/login.dto';
import { RegisterDto } from '@server/modules/auth/dtos/register.dto';
import { Public } from './guards/public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('data')
  async getdata(@Req() req) {
    console.log('req', req.user);
    return req.user;
  }

  @Get('me')
  async me(@Req() req) {
    return this.authService.getLoggerUser(req.user.id);
  }
}
