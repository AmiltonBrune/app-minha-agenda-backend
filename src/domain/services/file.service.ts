import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as mime from 'mime-types';
import { v4 as uuid } from 'uuid';

import { AwsConfigService } from '@minha-agenda/application/configs/aws.config';
import { File, User } from '@minha-agenda/domain/entities';
import { UserService } from '@minha-agenda/domain/services';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    private userService: UserService,
    private awsConfigService: AwsConfigService,
  ) {}

  async findAllFileteByUser(user: User) {
    try {
      const files = await this.fileRepository.find({
        where: { userCreated: { id: user.id } },
      });

      return files;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new InternalServerErrorException('Error get files');
    }
  }

  async uploadFile(file: Express.Multer.File, user: User) {
    try {
      const extension = mime.extension(file.mimetype);
      const filename = `${uuid()}-${new Date().getTime()}.${extension}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ACL: 'public-read',
      };

      const result = await this.awsConfigService
        .getS3()
        .upload(params)
        .promise();

      const photo = new File();

      photo.key = result.Key;
      photo.url = result.Location;
      photo.userCreated = user;

      await this.fileRepository.save(photo);
      delete photo.userCreated;

      return photo;
    } catch (error) {
      throw new InternalServerErrorException('Error saving user to database');
    }
  }

  async deleteFile(id: string) {
    try {
      const file = await this.fileRepository.findOne({ where: { id } });

      if (!file) {
        throw new NotFoundException(`File with ID "${id}" not found`);
      }

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.key,
      };

      await this.awsConfigService.getS3().deleteObject(params).promise();

      await file.remove();
      return;
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw new InternalServerErrorException('Error removed file');
    }
  }

  async addPhoto(userId: string, file: Express.Multer.File) {
    const user = await this.userService.findUserById(userId);

    if (user.photo) {
      await this.userService.updateUser(userId, { ...user, photo: null });
      await this.deleteFile(user.photo.id);
    }

    const photo = await this.uploadFile(file, user);

    await this.userService.updateUser(userId, { ...user, photo });

    return photo;
  }
}
