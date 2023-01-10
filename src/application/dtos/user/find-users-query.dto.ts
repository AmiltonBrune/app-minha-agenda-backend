import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '@minha-agenda/core/shared/dto/base-query-parameters.dto';
import { IsOptional } from 'class-validator';

export class FindUsersQueryDto extends BaseQueryParametersDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  page: number;

  @ApiProperty()
  @IsOptional()
  limit: number;
}
