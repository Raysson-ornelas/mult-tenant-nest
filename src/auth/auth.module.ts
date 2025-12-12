import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from 'src/user/user.controller';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    FacebookStrategy,
    AuthService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
