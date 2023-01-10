import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config as dotenv } from 'dotenv';

import { File, User, Contact } from 'src/domain/entities';

dotenv();

const configService = new ConfigService();

const config: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [File, User, Contact],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
export default config;
