import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Comment } from '@server/entity/entities/Comment';
import { LessonSentence } from '@server/entity/entities/LessonSentence';
import { User } from '@server/entity/entities/User';
import { CreateCommentDto } from '@server/modules/comment/dto/createComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    private em: EntityManager
  ) {}

  async createComment(user: User, payload: CreateCommentDto) {
    try {
      const lessonSentence = await this.em.findOneOrFail(LessonSentence, {
        id: payload.sentenceId,
        dictation_lesson: payload.lessonId,
      });
      const newComment = new Comment();
      newComment.content = payload['content'];
      newComment.user = user;
      newComment.lesson_sentence = lessonSentence;

      if (!payload.parentId) {
        await this.em.persistAndFlush([newComment, lessonSentence]);
        return { rootComment: newComment };
      }

      const parentComment = await this.em.findOneOrFail(
        Comment,
        {
          id: payload?.parentId,
          lesson_sentence: payload.sentenceId,
        },
        { populate: ['childs', 'user.id'] }
      );
      newComment.parent = parentComment;
      parentComment.childs.add(newComment);
      await this.em.persistAndFlush([newComment, parentComment]);

      return { replyComment: newComment };
    } catch (error) {
      console.log('error', error);
    }
  }

  async getComment(id: number) {
    return await this.commentRepository.findOneOrFail(id, {
      populate: ['parent', 'childs.childs'],
    });
  }
}
