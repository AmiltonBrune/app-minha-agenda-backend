import { AwsConfigService } from '@minha-agenda/application/configs/aws.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import typeOrmConfig from '@minha-agenda/application/configs/typeorm.config';

import { User, File, Contact } from '@minha-agenda/domain/entities';
import {
  AuthController,
  ContactController,
  FileController,
} from '@minha-agenda/endpoints/controllers';
import {
  UserService,
  AuthService,
  FileService,
  ContactService,
} from '@minha-agenda/domain/services';
import { NodeMailerService } from '@minha-agenda/infra/services';
import { JwtStrategy } from '@minha-agenda/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, File, Contact]),
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JTW_SECRET,
      signOptions: {
        expiresIn: 18000,
      },
    }),
  ],
  controllers: [AuthController, ContactController, FileController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    NodeMailerService,
    FileService,
    AwsConfigService,
    ContactService,
  ],
})
export class AppModule {}
