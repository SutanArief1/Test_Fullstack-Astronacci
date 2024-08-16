import { HttpException, Injectable, Post, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }
  async validateOAuthLogin(profile: any): Promise<any> {
    if (!profile || !profile.id || !profile.emails || !profile.displayName) {
      throw new HttpException('Profile not found', 400);
    }

    const { id, emails, displayName } = profile;

    const email = emails[0].value;

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          fullname: displayName,
          provider: 'google',
          providerId: id,
          role: 'Bronze',
        },
      });
    }

    return user;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User info from google',
      user: req.user,
    };
  }

  async facebookLogin(accessToken: string) {
    try {
      const fbUser = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
      );

      const { email, name, id } = fbUser.data;

      let user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            fullname: name,
            providerId: id,
            role: 'Bronze',
          },
        });
      }

      const payload = { sub: user.id, email: user.email, role: user.role };
      const access_token = this.jwtService.sign(payload);

      return { access_token, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid Facebook token');
    }
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, fullname: user.fullname, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
