import { Module } from '@nestjs/common';
import { DictationService } from './dictation.service';
import { DictationController } from './dictation.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DictationLesson } from '@server/entity/entities/DictationLesson';
import { UploadService } from '@server/modules/upload/upload.service';
import { StoredFile } from '@server/entity/entities/StoredFile';
import { LessonProgress } from '@server/entity/entities/LessonProgress';
import { LessonSentence } from '@server/entity/entities/LessonSentence';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      DictationLesson,
      StoredFile,
      LessonProgress,
      LessonSentence,
    ]),
  ],
  controllers: [DictationController],
  providers: [DictationService, UploadService],
})
export class DictationModule {}
