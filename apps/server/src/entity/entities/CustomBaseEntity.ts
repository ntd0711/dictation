import { BaseEntity, PrimaryKey, Property } from '@mikro-orm/core';
import { Maybe, Scalar } from '@server/constant/scalar';

export abstract class CustomBaseEntity extends BaseEntity {
  @PrimaryKey({ type: 'int', default: null })
  id!: Scalar['integer'];

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
