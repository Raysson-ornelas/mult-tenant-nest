import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: {
      name: { givenName: string; familyName: string };
      emails: { value: string }[];
      id: string;
    },
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails } = profile;
    if (!emails || emails.length === 0) {
      done(new Error('Google provider did not return an email address'));
    }
    const user = await this.authService.validateUser({
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      provider: 'google',
      providerId: profile.id,
      tenantId: 'default-tenant-id',
    });
    done(null, user);
  }
}
