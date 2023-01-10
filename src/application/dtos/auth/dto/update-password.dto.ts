import { ApiProperty } from '@nestjs/swagger';
export class UpdatePasswordUserDto {
  @ApiProperty()
  resetPasswordExpires: number;

  @ApiProperty()
  resetPasswordToken: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  code: string;
}
