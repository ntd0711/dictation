import { PrimaryKey, Property, BaseEntity } from '@mikro-orm/core';
import { Maybe, Scalar } from '@server/constant/scalar';
import * as uuid from 'uuid';

export abstract class UuidCustomBaseEntity extends BaseEntity {
  @PrimaryKey({ type: 'uuid', default: null })
  id: Scalar['uuid'] = uuid.v4();

  @Property({ type: 'integer', nullable: true })
  created_by!: Maybe<'integer'>;

  @Property({ type: 'integer', nullable: true })
  updated_by!: Maybe<'integer'>;

  @Property({ type: 'timestamp', default: 'now()' })
  created_at: Date = new Date();

  @Property({ type: 'timestamp', default: 'now()', onUpdate: () => new Date() })
  updated_at: Date = new Date();

  @Property({ nullable: true })
  deleted_at?: Scalar['timestamp'];
}
