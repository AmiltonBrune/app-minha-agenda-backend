import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@minha-agenda/domain/entities';
import {
  CreateUserDto,
  CredentialsDto,
  FindUsersQueryDto,
} from '@minha-agenda/application/dtos';
import { UserRole } from '@minha-agenda/application/enums';
import * as bcrypt from 'bcrypt';
import {
  UpdatePasswordUserDto,
  UpdateTokenUserDto,
} from '@minha-agenda/application/dtos/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async findAllUsers(
    query: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    query.page = query.page ? (query.page < 1 ? 1 : query.page) : 1;
    query.limit = query.limit ? (query.limit > 100 ? 100 : query.limit) : 100;

    const { name, email, phone } = query;

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'user.role',
        'user.photo',
        'user.createdAt',
        'user.updatedAt',
      ]);

    if (name) {
      queryBuilder.andWhere('user.name = :name', { name });
    }

    if (email) {
      queryBuilder.andWhere('user.email = :email', { email });
    }

    if (phone) {
      queryBuilder.andWhere('user.phone = :phone', { phone });
    }

    queryBuilder.skip(Number((query.page - 1) * query.limit));
    queryBuilder.take(Number(+query.limit));

    const keySort = query.sort
      ? Object.keys(JSON.parse(query.sort))[0]
      : undefined;

    const valueSort = query.sort
      ? Object.values(JSON.parse(query.sort))[0]
      : undefined;

    if (keySort == 'updatedAt') {
      if (valueSort == 'DESC') {
        queryBuilder.orderBy('user.updatedAt', 'DESC');
      } else {
        queryBuilder.orderBy('user.updatedAt', 'ASC');
      }
    } else {
      queryBuilder.orderBy(query.sort ? JSON.parse(query.sort) : undefined);
    }

    const [users, total] = await queryBuilder.getManyAndCount();

    return { users, total };
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'role', 'photo'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserByEmailAndCode(email: string, code: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, code },
      select: ['id', 'name', 'email', 'resetPasswordExpires'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, password, phone } = createUserDto;

    const user = new User();
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();

      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      console.log('error', error);

      if (error.code.toString() === '23505') {
        throw new ConflictException('Email address already in use');
      } else {
        throw new InternalServerErrorException('Error saving user to database');
      }
    }
  }

  async updateUser(id: string, updateUserDto: any) {
    try {
      const { photo } = updateUserDto;

      const getUserFromDB = await this.userRepository.findOne({
        where: { id },
        relations: ['photo'],
      });

      if (!getUserFromDB) {
        throw new InternalServerErrorException('User not found');
      }

      this.userRepository.merge(getUserFromDB, { ...updateUserDto, photo });

      await getUserFromDB.save();

      return getUserFromDB;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async deleteUser(id: string) {
    try {
      const getUserFromDB = await this.userRepository.findOne({
        where: { id },
      });
      if (!getUserFromDB) {
        throw new InternalServerErrorException('User not found');
      }
      await getUserFromDB.remove();
      return getUserFromDB;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async updateUserToken(updateTokenUser: UpdateTokenUserDto, id: string) {
    const user = await this.findUserById(id);
    const { resetPasswordToken, resetPasswordExpires, code } = updateTokenUser;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    user.code = code;

    try {
      await user.save();

      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error saving data to database');
    }
  }

  async updateUserPassword(
    updatePasswordUser: UpdatePasswordUserDto,
    id: string,
  ) {
    const user = await this.findUserById(id);
    const { code, password, resetPasswordExpires, resetPasswordToken, salt } =
      updatePasswordUser;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    user.password = password;
    user.salt = salt;
    user.code = code;

    try {
      await user.save();

      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error saving data to database');
    }
  }
}
