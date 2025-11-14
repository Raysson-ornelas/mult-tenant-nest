import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(
    provider: string,
    profile: any,
    tenantId: string,
  ): Promise<any> {
    const { id, emails, name } = profile;
    const user = await this.prisma.user.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId: id,
        },
      },
    });

    if (user) {
      return user;
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: emails[0].value,
        name: `${name.givenName} ${name.familyName}`,
        provider,
        providerId: id,
        tenantId,
      },
    });

    return newUser;
  }
}
