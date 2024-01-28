import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '@server/modules/comment/dto/createComment.dto';
import { RequestUser } from '../dictation/dictation.controller';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: RequestUser
  ) {
    return this.commentService.createComment(req.user, createCommentDto);
  }
  @Get(':id')
  getComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.getComment(id);
  }
}
