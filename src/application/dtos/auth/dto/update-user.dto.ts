import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@minha-agenda/application/enums';

export class UpdateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  photo: string;
}
