import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
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

  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @ApiProperty()
  photo: string;
}
