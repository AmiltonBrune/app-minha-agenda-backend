import { ApiProperty } from '@nestjs/swagger';
export class UpdateTokenUserDto {
  @ApiProperty()
  resetPasswordExpires: number;

  @ApiProperty()
  resetPasswordToken: string;

  @ApiProperty()
  code: string;
}
