import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: { email: string }) {
    return await this.authService.login(payload.email);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  refreshToken(@Req() req) {
    return this.refreshToken(req.user.id);
  }
}

// @UseGuards(GoogleAuthGuard)
// @Get('google/login')
// googleLogin() {}

//   @UseGuards(GoogleAuthGuard)
//   @Get('google/callback')
//   async googleCallback(@Req() req) {

// }
