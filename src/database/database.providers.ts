import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE_MYSQL',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url:
          process.env.NODE_ENV === 'test'
            ? process.env.MYSQL_SERVER_URI_TEST
            : process.env.MYSQL_SERVER_URI,
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: ['dist/database/migrations/*.js'],
        synchronize: true,
        logging: process.env.NODE_ENV === 'development',
      });
      return dataSource.initialize();
    },
  },
];
