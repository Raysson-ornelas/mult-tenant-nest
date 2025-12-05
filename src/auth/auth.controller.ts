import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService, SignInResponse } from './auth.service';

class GoogleAuthMobileDto {
  idToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req: Request) {
    if (req.user) return this.authService.signInWithGoogleToken(req.user);
  }

  @Post('google/mobile')
  async googleMobile(
    @Body() body: GoogleAuthMobileDto,
  ): Promise<SignInResponse> {
    return this.authService.handleGoogleAuth(body.idToken);
  }

  // @Get('facebook')
  // @UseGuards(AuthGuard('facebook'))
  // facebookLogin() {}

  // @Get('facebook/callback')
  // @UseGuards(AuthGuard('facebook'))
  // facebookLoginCallback(@Req() req: Request) {
  //   if (req.user) return this.authService.login(req.user);
  // }
}
