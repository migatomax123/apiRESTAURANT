import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // login
  @Post('login')
  login(@Body() logindto: LoginAuthDto) {
    return this.authService.login(logindto);
  }

  // register
  @Post('register')
  register(@Body() registeredto: RegisterAuthDto) {
    return this.authService.register(registeredto);
  }

  // logout

  // checkToken

  // perfil
}