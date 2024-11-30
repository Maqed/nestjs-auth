import {
  Controller,
  Post,
  Body,
  ConflictException,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const existingUser = await this.authService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.authService.createUser(name, email, password);

    const { password: _, ...userResponse } = user;
    return userResponse;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signout')
  async signout(@Request() req) {
    return req.logout();
  }
}
