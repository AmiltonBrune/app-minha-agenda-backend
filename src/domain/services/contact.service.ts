import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact, User } from '@minha-agenda/domain/entities';
import {
  CreateContactDto,
  FindContactQueryDto,
} from '@minha-agenda/application/dtos';
import { UserService } from './user.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly clientRepository: Repository<Contact>,
    private readonly userService: UserService,
  ) {}

  async findAllContacts(
    query: FindContactQueryDto,
    user: User,
  ): Promise<{ contacts: Contact[]; total: number }> {
    query.page = query.page ? (query.page < 1 ? 1 : query.page) : 1;
    query.limit = query.limit ? (query.limit > 100 ? 100 : query.limit) : 100;

    const { name, email, phone } = query;

    const queryBuilder = this.clientRepository
      .createQueryBuilder('contact')
      .select([
        'contact.id',
        'contact.name',
        'contact.email',
        'contact.phone',
        'contact.user',
        'contact.createdAt',
        'contact.updatedAt',
      ])
      .leftJoin('contact.user', 'user')
      .where('user.id = :id', {
        id: user.id,
      })
      .orderBy('contact.createdAt', 'DESC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit);

    if (name) {
      queryBuilder.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (email) {
      queryBuilder.andWhere('user.email ILIKE :email', {
        email: `%${email}%`,
      });
    }

    if (phone) {
      queryBuilder.andWhere('user.phone ILIKE :phone', { phone: `%${phone}%` });
    }

    const [contacts, total] = await queryBuilder.getManyAndCount();

    return { contacts, total };
  }

  async findContactById(id: string): Promise<Contact> {
    const query = this.clientRepository
      .createQueryBuilder('contact')
      .select([
        'contact.id',
        'contact.name',
        'contact.email',
        'contact.phone',
        'contact.createdAt',
      ])
      .where('contact.id = :id', {
        id,
      });

    const contact = await query.getOne();

    return contact;
  }

  async createContact(
    CreateContactDto: CreateContactDto,
    user: User,
  ): Promise<Contact> {
    try {
      const { name, email, phone } = CreateContactDto;

      const getUser = await this.userService.findUserById(user.id);

      if (!getUser) {
        throw new InternalServerErrorException('User not found');
      }

      const contact = new Contact();
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      contact.user = getUser;

      await contact.save();

      return contact;
    } catch (error) {
      throw new InternalServerErrorException('Error save database');
    }
  }

  async updateContact(
    id: string,
    CreateContactDto: CreateContactDto,
  ): Promise<Contact> {
    try {
      const { name, email, phone } = CreateContactDto;

      const contact = await this.findContactById(id);

      if (!contact) {
        throw new InternalServerErrorException('Contact not found');
      }

      contact.name = name;
      contact.email = email;
      contact.phone = phone;

      await contact.save();

      return contact;
    } catch (error) {
      throw new InternalServerErrorException('Error save database');
    }
  }

  async deleteContact(id: string) {
    try {
      const getContactFromDB = await this.clientRepository.findOne({
        where: { id },
      });
      if (!getContactFromDB) {
        throw new InternalServerErrorException('Contact not found');
      }
      await getContactFromDB.remove();
      return getContactFromDB;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException('Error deleting user');
    }
  }
}
