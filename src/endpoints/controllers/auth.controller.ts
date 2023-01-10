import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService, UserService } from '@minha-agenda/domain/services';
import {
  CreateUserDto,
  CredentialsDto,
  ForgetPasswordDto,
  ResetPasswordDto,
} from '@minha-agenda/application/dtos';
import { User } from '@minha-agenda/domain/entities';
import { GetUser } from '@minha-agenda/application/decorator';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.userService.createUser(createUserDto);
    return {
      message: 'User successfully registered',
    };
  }

  @Post('/signin')
  @ApiBody({ type: CredentialsDto })
  async signIn(
    @Body() credentiaslsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return await this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
