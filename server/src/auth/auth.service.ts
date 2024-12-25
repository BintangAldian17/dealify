import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtpayload';
import { sanitizedUser } from '../common/sanitized';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });
    if (user) return user;
    return await this.prisma.user.create({
      data: googleUser,
    });
  }
  async login(email: string) {
    const user = await this.userService.validateUserByEmail(email);
    const payload: AuthJwtPayload = { sub: email };
    const token = this.jwtService.sign(payload);
    const userPayload = sanitizedUser(user);
    return { ...userPayload, token };
  }

  refreshToken(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const newToken = this.jwtService.sign(payload);

    return newToken;
  }
}
