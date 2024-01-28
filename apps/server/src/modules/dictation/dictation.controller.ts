import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DictationService } from './dictation.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { User } from '@server/entity/entities/User';

export interface RequestUser extends Request {
  user: User;
}

@Controller('dictation')
export class DictationController {
  constructor(private readonly dictationService: DictationService) {}

  @Get('')
  get() {
    return 'hello dictation API';
  }

  @Get('sentence')
  getSentence(
    @Query('lessonId', ParseIntPipe) lessonId: number,
    @Query('audioKey') audioKey: string
  ) {
    return this.dictationService.getSentence(lessonId, audioKey);
    // return audioKey;
  }

  @Get('short-stories')
  shortStoryLessons() {
    return this.dictationService.shortStoryLessons();
  }

  @Get('daily-conversations')
  dailyConversationLessons() {
    return this.dictationService.dailyConversationLessons();
  }

  @Get('toeic')
  toeicListeningLessons() {
    return this.dictationService.toeicListeningLessons();
  }

  @Get(':id')
  lesson(
    @Param('id', ParseIntPipe) id: number,
    @Query('languageCode') languageCode: string
  ) {
    return this.dictationService.lesson(id, languageCode);
  }

  @Patch('add-translate/:id')
  @UseInterceptors(FileInterceptor('translated_file'))
  addTranslatedLanguage(
    @UploadedFile() file: any,
    @Param('id', ParseIntPipe) id: number
  ) {
    const translatedLanguage = JSON.parse(file.buffer);
    return this.dictationService.addTranslateLanguage(id, translatedLanguage);
  }

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'texts', maxCount: 1 },
      { name: 'translated_file', maxCount: 1 },
      { name: 'audio', maxCount: 4 },
    ])
  )
  async createLesson(
    @UploadedFiles()
    files: {
      texts?: any;
      translated_file?: any;
      audio?: any;
    },
    @Body() createLessonDto: any
  ) {
    const texts = JSON.parse(files.texts[0].buffer);
    const translated_file = JSON.parse(files.translated_file[0].buffer);
    const audio = files.audio;

    return this.dictationService.createLesson({
      ...createLessonDto,
      texts: texts,
      translated_file,
      audio,
    });
  }

  @Post('save-progress/:id')
  saveProgress(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: { sentenceNumber: number },
    @Req() req: RequestUser
  ) {
    return this.dictationService.saveProgress(
      req.user.id,
      id,
      +payload.sentenceNumber
    );
  }

  @Delete('delete/:id')
  deleteLesson(@Param('id', ParseIntPipe) id: number) {
    return this.dictationService.remove(id);
  }
}
