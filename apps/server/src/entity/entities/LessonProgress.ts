import { BaseEntity, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Scalar } from '@server/constant/scalar';
import { User } from '@server/entity/entities/User';
import { DictationLesson } from '@server/entity/entities/DictationLesson';
import { CustomBaseEntity } from '@server/entity/entities/CustomBaseEntity';

@Entity({ tableName: 'lesson_progresses' })
export class LessonProgress extends CustomBaseEntity {
  @Property({ type: 'integer' })
  repeated: Scalar['integer'];

  @Property({ type: 'integer' })
  current_sentence: Scalar['integer'];

  @ManyToOne({
    entity: () => User,
    inversedBy: 'lesson_progresses',
    nullable: true,
  })
  user!: User;

  @ManyToOne({
    entity: () => DictationLesson,
    inversedBy: 'lesson_progresses',
    nullable: true,
  })
  dictation_lesson!: DictationLesson;
}
