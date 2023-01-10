import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDtos {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  photo: string;
}
