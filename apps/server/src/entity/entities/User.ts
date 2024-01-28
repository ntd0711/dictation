import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Maybe, Scalar } from '@server/constant/scalar';
import { CustomBaseEntity } from '@server/entity/entities/CustomBaseEntity';
import { StoredFile } from '@server/entity/entities/StoredFile';
import { DictationLesson } from './DictationLesson';
import { LessonProgress } from '@server/entity/entities/LessonProgress';
import { Comment } from './Comment';
import { UserSetting } from './UserSetting';

@Entity({ tableName: 'users' })
export class User extends CustomBaseEntity {
  @Property({ type: 'varchar', length: 255 })
  name!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255 })
  email!: Scalar['varchar'];

  @Property({ type: 'varchar', length: 255 })
  password!: Scalar['varchar'];

  @Property({ type: 'integer' })
  role_id!: Scalar['integer'];

  @Property({ type: 'date', nullable: true })
  last_login!: Scalar['date'];

  @Property({ type: 'date', nullable: true })
  last_active!: Scalar['date'];

  @ManyToOne({
    entity: () => StoredFile,
    nullable: true,
    inversedBy: 'account_avatar',
  })
  avatar!: StoredFile;

  @ManyToMany({
    entity: () => DictationLesson,
    mappedBy: 'users',
  })
  dictation_lessons = new Collection<DictationLesson>(this);

  @OneToMany({ entity: () => LessonProgress, mappedBy: 'user' })
  lesson_progresses = new Collection<LessonProgress>(this);

  @OneToMany({
    entity: () => Comment,
    mappedBy: 'user',
    cascade: [Cascade.ALL],
  })
  comments = new Collection<Comment>(this);

  @OneToOne({
    entity: () => UserSetting,
    mappedBy: 'user',
    cascade: [Cascade.ALL],
  })
  setting!: UserSetting;
}
