// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url:
    process.env.NODE_ENV === 'test'
      ? process.env.MYSQL_SERVER_URI_TEST
      : process.env.MYSQL_SERVER_URI,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // bỏ khi dùng production,
  migrations: ['dist/database/migrations/*.js'],
  logging: process.env.NODE_ENV === 'development',
};

export default typeOrmConfig;
