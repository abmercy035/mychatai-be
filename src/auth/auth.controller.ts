/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({
  path: 'auth',
  version: 'v1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.findOne(createAuthDto);
  }
  @Post("/signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
