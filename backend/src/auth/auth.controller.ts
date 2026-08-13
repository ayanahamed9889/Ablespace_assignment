import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SessionGuard } from './guards/session.guard';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest')
  async guestLogin() {
    const user = await this.authService.guestLogin();
    // token goes back to the client, which stores it (localStorage) and
    // sends it as "Authorization: Bearer <token>" on every request after.
    return { id: user.id, name: user.name, token: user.token };
  }

  @Get('me')
  @UseGuards(SessionGuard)
  me(@Req() req: Request & { user: User }) {
    return { id: req.user.id, name: req.user.name };
  }
}
