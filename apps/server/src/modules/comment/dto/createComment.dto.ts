import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsOptional()
  parentId: number;

  @IsNumber()
  lessonId: any;

  @IsNumber()
  sentenceId: number;

  @IsNotEmpty()
  content: string;
}
