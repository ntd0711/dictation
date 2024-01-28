import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Scalar } from '@server/constant/scalar';
import { User } from '@server/entity/entities/User';
import { UuidCustomBaseEntity } from '@server/entity/entities/UuidCustomBaseEntity';
import { DictationLesson } from '@server/entity/entities/DictationLesson';
import { LessonSentence } from '@server/entity/entities/LessonSentence';

@Entity({ tableName: 'stored_files' })
export class StoredFile extends UuidCustomBaseEntity {
  @Property({ type: 'text' })
  name!: Scalar['text'];

  @Unique()
  @Property({ type: 'text' })
  hash!: Scalar['text'];

  @Property({ type: 'text' })
  path!: Scalar['text'];

  @Property({ type: 'text' })
  key!: Scalar['text'];

  @OneToMany({
    entity: () => User,
    mappedBy: 'avatar',
  })
  account_avatar = new Collection<User>(this);

  // @ManyToOne({
  //   entity: () => DictationLesson,
  //   inversedBy: 'audio_files',
  //   nullable: true,
  // })
  // dictation_lesson_id!: DictationLesson;

  @OneToOne({
    entity: () => LessonSentence,
    mappedBy: 'audio',
  })
  lesson_sentence!: LessonSentence;
}
