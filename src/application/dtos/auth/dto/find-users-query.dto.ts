import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '@minha-agenda/core/shared/dto/base-query-parameters.dto';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  role: string;
}
