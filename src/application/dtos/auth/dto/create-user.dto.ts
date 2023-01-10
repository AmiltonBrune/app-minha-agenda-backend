import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Enter an email address',
  })
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email address',
    },
  )
  @MaxLength(200, {
    message: 'The email address must be less than 200 characters.',
  })
  @ApiProperty()
  email: string;

  @IsNotEmpty({
    message: 'Enter user name',
  })
  @MaxLength(200, {
    message: 'The name must be less than 200 characters.',
  })
  @ApiProperty()
  name: string;

  @IsNotEmpty({
    message: 'Enter user phone',
  })
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  photo: string;

  @IsNotEmpty({
    message: 'Enter a password',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty({
    message: 'Enter password confirmation',
  })
  @MinLength(6, {
    message: 'Password confirmation must be at least 6 characters long.',
  })
  @ApiProperty()
  passwordConfirmation: string;
}
