import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Comment } from '@server/entity/entities/Comment';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [MikroOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
