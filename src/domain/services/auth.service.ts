import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {
  CredentialsDto,
  ForgetPasswordDto,
  ResetPasswordDto,
} from '@minha-agenda/application/dtos';
import { NodeMailerService } from '@minha-agenda/infra/services';
import { compareDate, generateRandomString } from '@minha-agenda/core/utils';
import { templateForgetPassword } from '@minha-agenda/core/templates/forgetPasswordEmail';
import { UnprocessableEntityException } from '@nestjs/common';
import { templateForgetPasswordSucess } from '@minha-agenda/core/templates/forgetPasswordEmailSuccess';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private nodeMailerService: NodeMailerService,
  ) {}

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.userService.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }

  async forgetPassword(body: ForgetPasswordDto) {
    const { email } = body;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.sign(jwtPayload);
    const code = await generateRandomString(4);

    await this.userService.updateUserToken(
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
        code,
      },
      user.id,
    );

    const mail = await templateForgetPassword({
      name: user.name.split(' ')[0],
      email: user.email,
      code,
    });

    await this.nodeMailerService.send(mail);

    return {
      message: 'Kindly check your email for further instructions',
    };
  }

  async resetPassword(body: ResetPasswordDto) {
    const { code, password, passwordConfirmation, email } = body;

    if (password != passwordConfirmation) {
      throw new UnprocessableEntityException('Passwords do not match');
    }

    const user = await this.userService.findUserByEmailAndCode(email, code);

    if (!user) {
      throw new UnauthorizedException('Code expired');
    }

    const now = Date.now();
    const expires = Number(user.resetPasswordExpires);
    const isExpired = compareDate(expires, now);

    if (!isExpired) {
      throw new UnauthorizedException('Token expired');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await this.userService.hashPassword(password, salt);
    await this.userService.updateUserPassword(
      {
        salt,
        password: passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        code: null,
      },
      user.id,
    );

    const mail = await templateForgetPasswordSucess({
      email: user.email,
      name: user.name.split(' ')[0],
    });

    await this.nodeMailerService.send(mail);

    return {
      message: 'Password updated successfully',
    };
  }
}
