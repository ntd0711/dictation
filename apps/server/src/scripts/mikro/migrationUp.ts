import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config';

(async () => {
  const orm = await MikroORM.init(config);

  const migrator = orm.getMigrator();
  await migrator.up();

  await orm.close(true);
})();
