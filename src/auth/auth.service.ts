
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(details: any) {
    let user = await this.prisma.user.findUnique({
      where: {
        provider_providerId: {
          provider: details.provider,
          providerId: details.providerId,
        },
      },
    });

    if (user) {
      return user;
    }

    user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });

    if (user) {
      return this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          provider: details.provider,
          providerId: details.providerId,
        },
      });
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.name,
        provider: details.provider,
        providerId: details.providerId,
      },
    });

    return newUser;
  }

  login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
