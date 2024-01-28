import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from '@mikro-orm/core';
import { CustomBaseEntity } from '@server/entity/entities/CustomBaseEntity';
import { DictationLesson } from '@server/entity/entities/DictationLesson';
import { StoredFile } from '@server/entity/entities/StoredFile';
import { Comment } from '@server/entity/entities/Comment';

@Entity({ tableName: 'lesson_sentences' })
export class LessonSentence extends CustomBaseEntity {
  @ManyToOne({
    entity: () => DictationLesson,
    inversedBy: 'sentences',
    nullable: true,
    deleteRule: 'cascade',
  })
  dictation_lesson!: LessonSentence;

  @OneToOne({
    entity: () => StoredFile,
    inversedBy: 'lesson_sentence',
    // deleteRule: 'cascade',
    // cascade: [Cascade.REMOVE],
  })
  audio!: StoredFile;

  @OneToMany({
    entity: () => Comment,
    mappedBy: 'lesson_sentence',
  })
  comments = new Collection<Comment>(this);
}
