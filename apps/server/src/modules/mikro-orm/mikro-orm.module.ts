import { MikroOrmModule as OrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import config from '@server/mikro-orm.config';

@Module({
  imports: [OrmModule.forRoot(config)],
  exports: [OrmModule],
})
export class MikroOrmModule {
  // private readonly logger = new Logger(MikroOrmModule.name);
  // async onModuleInit() {
  //   this.logger.log('Starting migration...');
  //   const orm = await MikroORM.init(config);
  //   const migrator = orm.getMigrator();
  //   await migrator.up();
  //   await orm.close(true);
  //   this.logger.log('Migration ended.');
  // }
}
