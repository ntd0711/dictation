import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Scalar } from '@server/constant/scalar';
import { CustomBaseEntity } from '@server/entity/entities/CustomBaseEntity';
import { User } from '@server/entity/entities/User';
import { LessonSentence } from '@server/entity/entities/LessonSentence';

@Entity({ tableName: 'comments' })
export class Comment extends CustomBaseEntity {
  @Property({ type: 'varchar' })
  content!: Scalar['varchar'];

  @Property({ type: 'json', nullable: true })
  reactionCount!: Scalar['jsonb'];

  @Property({ type: 'boolean', default: false })
  isHidden!: Scalar['boolean'];

  @ManyToOne({
    entity: () => User,
    inversedBy: 'comments',
    deleteRule: 'cascade',
  })
  user!: User;

  @ManyToOne({
    entity: () => Comment,
    nullable: true,
  })
  parent!: Comment;

  @OneToMany({ entity: () => Comment, mappedBy: 'parent' })
  childs = new Collection<Comment>(this);

  @ManyToOne({
    entity: () => LessonSentence,
    inversedBy: 'comments',
    nullable: true,
  })
  lesson_sentence!: LessonSentence;
}
