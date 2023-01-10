import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Put,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard, RolesGuard } from '@minha-agenda/application/guards';
import { Role, GetUser } from '@minha-agenda/application/decorator';
import { UserRole } from '@minha-agenda/application/enums';
import {
  CreateContactDto,
  FindContactQueryDto,
} from '@minha-agenda/application/dtos';
import { ContactService } from '@minha-agenda/domain/services/contact.service';
import { User } from '@minha-agenda/domain/entities';

@Controller('contacts')
@ApiTags('contacts')
@ApiBearerAuth()
@UseGuards(AuthGuard(), JwtAuthGuard, RolesGuard)
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  @Role(UserRole.USER)
  @ApiQuery({
    name: 'name',
    description: 'Nome',
    required: false,
  })
  @ApiQuery({
    name: 'email',
    description: 'E-mail',
    required: false,
  })
  @ApiQuery({
    name: 'phone',
    description: 'Telefone',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit',
    required: false,
  })
  async findAll(@Query() query: FindContactQueryDto, @GetUser() user: User) {
    return this.contactService.findAllContacts(query, user);
  }

  @Get(':id')
  @Role(UserRole.USER)
  async findById(@Param('id') id: string) {
    return this.contactService.findContactById(id);
  }

  @Post()
  @Role(UserRole.USER)
  async create(
    @Body(ValidationPipe) createContactDto: CreateContactDto,
    @GetUser() user: User,
  ) {
    return this.contactService.createContact(createContactDto, user);
  }

  @Put(':id')
  @Role(UserRole.USER)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) createContactDto: CreateContactDto,
  ) {
    return this.contactService.updateContact(id, createContactDto);
  }

  @Delete(':id')
  @Role(UserRole.USER)
  async delete(@Param('id') id: string) {
    return this.contactService.deleteContact(id);
  }
}
