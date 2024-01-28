import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Scalar } from '@server/constant/scalar';
import { LessonProgress } from '@server/entity/entities/LessonProgress';
import { LessonSentence } from '@server/entity/entities/LessonSentence';
import { CustomBaseEntity } from './CustomBaseEntity';
import { User } from './User';

@Entity({ tableName: 'dictation_lessons' })
export class DictationLesson extends CustomBaseEntity {
  @Property({ type: 'varchar' })
  name!: Scalar['varchar'];

  @Property({ type: 'integer' })
  type!: Scalar['integer'];

  @Property({ type: 'json' })
  texts!: Scalar['jsonb'];

  @Property({ type: 'json' })
  translated_languages!: Scalar['jsonb'];

  @ManyToMany({
    entity: () => User,
    inversedBy: 'dictation_lessons',
  })
  users = new Collection<User>(this);

  @OneToMany({ entity: () => LessonProgress, mappedBy: 'dictation_lesson' })
  lesson_progresses = new Collection<LessonProgress>(this);

  @OneToMany({
    entity: () => LessonSentence,
    mappedBy: 'dictation_lesson',
    cascade: [Cascade.REMOVE],
  })
  sentences = new Collection<LessonSentence>(this);
}
