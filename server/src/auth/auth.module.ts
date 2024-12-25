import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import googleOauthConfig from './config/google-oauth.config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import jwtRefreshConfig from './config/jwt-refresh.config';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(jwtRefreshConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, AuthService, JwtRefreshStrategy],
})
export class AuthModule {}
