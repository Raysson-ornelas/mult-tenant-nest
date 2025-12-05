import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('FACEBOOK_APP_ID'),
      clientSecret: configService.getOrThrow<string>('FACEBOOK_APP_SECRET'),
      callbackURL: configService.getOrThrow<string>('FACEBOOK_CALLBACK_URL'),
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<void> {
    const { displayName, emails, id } = profile;
    if (!emails || emails.length === 0) {
      return done(
        new Error('Facebook provider did not return an email address'),
        null,
      );
    }
    const user = await this.authService.validateUser({
      email: emails[0].value,
      name: displayName,
      provider: 'facebook',
      providerId: id,
      tenantId: 'default-tenant-id',
    });
    done(null, user);
  }
}
