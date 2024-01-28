import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config';
import { __awaiter } from 'tslib';

(async () => {
  const orm = await MikroORM.init(config);

  const migrator = orm.getMigrator();
  await migrator.createMigration();

  await orm.close(true);
})();
