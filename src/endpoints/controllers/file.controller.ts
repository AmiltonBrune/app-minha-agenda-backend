import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard, RolesGuard } from '@minha-agenda/application/guards';
import { FileService } from '@minha-agenda/domain/services';
import { GetUser, Role } from '@minha-agenda/application/decorator';
import { UserRole } from '@minha-agenda/application/enums';
import { User } from '@minha-agenda/domain/entities';

@Controller('file')
@ApiTags('file')
@ApiBearerAuth()
@UseGuards(AuthGuard(), JwtAuthGuard, RolesGuard)
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  @Role(UserRole.USER)
  async getFiles(@GetUser() user: User) {
    return this.fileService.findAllFileteByUser(user);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Role(UserRole.USER)
  async uploadFile(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadFile(file, user);
  }

  @Post('user')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Role(UserRole.USER)
  async uploadUserFile(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.addPhoto(user.id, file);
  }

  @Delete(':id')
  @Role(UserRole.USER)
  async deleteFile(@Param('id') id: string) {
    return this.fileService.deleteFile(id);
  }
}
