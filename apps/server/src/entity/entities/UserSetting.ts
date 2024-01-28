import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@server/constant/scalar';
import { CustomBaseEntity } from '@server/entity/entities/CustomBaseEntity';
import { User } from '@server/entity/entities/User';

@Entity({ tableName: 'user_settings' })
export class UserSetting extends CustomBaseEntity {
  @Property({ type: 'varchar', nullable: true })
  translation_language_code!: Scalar['varchar'];

  @Property({ type: 'boolean', default: true })
  should_show_full_correction!: Scalar['boolean'];

  @Property({ type: 'integer', default: 0 })
  nb_auto_replay!: Scalar['integer'];

  @OneToOne({
    entity: () => User,
    owner: true,
    deleteRule: 'cascade',
  })
  user!: User;
}
