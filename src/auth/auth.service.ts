import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

export interface AuthTokenResponse {
  access_token: string;
}

export interface SignInResponse {
  user: User;
  access_token: string;
}

interface GooglePayload {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');

    if (!clientId) {
      throw new Error('GOOGLE_CLIENT_ID não configurado.');
    }

    this.googleClient = new OAuth2Client(clientId);
  }

  async validateUser(details: {
    email: string;
    name: string;
    provider: string;
    providerId: string;
    tenantId: string;
  }) {
    const userByProvider = await this.prisma.user.findUnique({
      where: { provider_providerId: details },
    });

    if (userByProvider) {
      return userByProvider;
    }

    return this.prisma.user.upsert({
      where: { email: details.email },
      create: details,
      update: {
        provider: details.provider,
        providerId: details.providerId,
      },
    });
  }

  signInWithGoogleToken(user: User): AuthTokenResponse {
    const payload = {
      username: user.name,
      sub: user.id,
      email: user.email,
      role: user.role,
      tenant: user.tenantId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleGoogleAuth(idToken: string): Promise<SignInResponse> {
    let googlePayload: GooglePayload;

    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID_ANDROID'),
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        throw new BadRequestException(
          'ID Token inválido ou não contém e-mail.',
        );
      }

      googlePayload = {
        sub: payload.sub,
        email: payload.email,
        name: payload.name || 'Usuário Google',
        picture: payload.picture,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro na validação do Google ID Token:', error.message);
      } else {
        console.error('Erro desconhecido na validação do Google:', error);
      }
      throw new UnauthorizedException(
        'Falha na autenticação Google. Token inválido.',
      );
    }

    const user = await this.processUserFromGoogle(googlePayload);

    const { access_token } = this.signInWithGoogleToken(user);

    return { user, access_token };
  }

  async processUserFromGoogle(details: GooglePayload): Promise<User> {
    const provider = 'google';
    const providerId = details.sub;

    const user = await this.prisma.user.findUnique({
      where: {
        provider_providerId: {
          provider: provider,
          providerId: providerId,
        },
      },
    });

    if (user) {
      return user;
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: details.email },
    });

    if (existingUser) {
      return this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          provider: provider,
          providerId: providerId,
          name: details.name,
        },
      });
    }

    const tenant = await this.prisma.tenant.create({
      data: {
        name: `${details.name}'s Space`,
      },
    });

    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.name,
        provider: provider,
        providerId: providerId,
        role: 'APP_USER',

        tenant: {
          connect: {
            id: tenant.id,
          },
        },
      },
    });

    return newUser;
  }
}
