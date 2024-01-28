import { Options } from '@mikro-orm/core';
import { Configuration } from '@mikro-orm/core/utils/Configuration';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { Logger } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from '@server/entity/entities/User';
import * as dotenv from 'dotenv';
import { StoredFile } from './entity/entities/StoredFile';
import { DictationLesson } from './entity/entities/DictationLesson';

dotenv.config();

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [User, StoredFile, DictationLesson],
  driver: PostgreSqlDriver,
  // dbName: process.env.DB_NAME,
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  dbName: 'fluentpal_db',
  host: process.env.DB_HOST,
  user: 'user',
  password: '123456',
  port: Number(process.env.DB_PORT) || 5438,
  extensions: [Migrator],
  debug: process.env.NODE_ENV === 'development',
  logger: logger.log.bind(logger),
  allowGlobalContext: true,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: '../server/src/entity/migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
  // seeder: {
  //   path: '../server/src/entity/seeders', // path to the folder with seeders
  //   pathTs: '../server/src/entity/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
  //   defaultSeeder: 'DatabaseSeeder', // default seeder class name
  //   glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
  //   emit: 'ts', // seeder generation mode
  //   fileName: (className: string) => className, // seeder file naming convention
  // },
};

export default config;
