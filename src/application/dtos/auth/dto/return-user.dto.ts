import { ApiProperty } from '@nestjs/swagger';
import { User } from '@minha-agenda/domain/entities';

export class ReturnUserDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  message: string;
}
