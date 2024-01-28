import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { DictationLessonType } from '@server/constant/DictationLessonType';
import { DictationLesson } from '@server/entity/entities/DictationLesson';
import { CreateLessonDto } from './dto/createLesson.dto';
import { UploadService } from '@server/modules/upload/upload.service';
import { LessonProgress } from '@server/entity/entities/LessonProgress';
import { User } from '@server/entity/entities/User';
import { StoredFile } from '@server/entity/entities/StoredFile';
import { LessonSentence } from '@server/entity/entities/LessonSentence';

@Injectable()
export class DictationService {
  constructor(
    @InjectRepository(DictationLesson)
    private readonly dictationRepository: EntityRepository<DictationLesson>,
    @InjectRepository(LessonProgress)
    private readonly lessonProgressRepository: EntityRepository<LessonProgress>,
    @InjectRepository(LessonSentence)
    private readonly lessonSentenceRepository: EntityRepository<LessonSentence>,
    @InjectRepository(StoredFile)
    private readonly storedFileRepository: EntityRepository<StoredFile>,
    private uploadService: UploadService,
    private em: EntityManager
  ) {}

  async shortStoryLessons() {
    return await this.dictationRepository.find({
      type: DictationLessonType.Short_Story,
    });
  }

  async dailyConversationLessons() {
    return await this.dictationRepository.find({
      type: DictationLessonType.Daily_Conversation,
    });
  }

  async toeicListeningLessons() {
    return await this.dictationRepository.find({
      type: DictationLessonType.Toeic_Listening,
    });
  }

  async remove(id: number) {
    const lesson = await this.dictationRepository.findOneOrFail({ id });
    // return lesson;
    return this.em.removeAndFlush(lesson);
  }

  async lesson(id: number, languageCode: string) {
    const lesson = await this.dictationRepository.findOneOrFail(
      { id },
      {
        populate: ['sentences.audio', 'lesson_progresses'],
        fields: [
          'name',
          'type',
          'texts',
          'translated_languages',
          'lesson_progresses',
          'sentences.audio.name',
          'sentences.audio.key',
          'lesson_progresses.repeated',
          'lesson_progresses.current_sentence',
        ],
      }
    );
    return lesson;
  }

  async createLesson(payload: CreateLessonDto) {
    const languageCode = payload.translated_file.languageCode;
    const translated_values = payload.translated_file.values;
    // this.em.begin();
    try {
      const lesson = new DictationLesson();
      lesson.name = payload.name;
      lesson.type = Number(payload.type);
      lesson.texts = payload.texts;
      lesson.translated_languages = { [languageCode]: translated_values };

      for (const file of payload.audio) {
        const storedFile = await this.uploadService.uploadAudioFile(file);
        const lessonSentence = new LessonSentence();
        lessonSentence.audio = storedFile;
        lesson.sentences.add(lessonSentence);
      }

      await this.em.flush();
      // await this.em.commit();

      return lesson;
    } catch (error) {
      console.log('error', error);
      // await this.em.rollback();
    }
  }

  async addTranslateLanguage(
    lessonId: number,
    translatedLanguage: {
      languageCode: string;
      values: object;
    }
  ) {
    const languageCode = translatedLanguage.languageCode;
    const translated_values = translatedLanguage.values;
    const lesson = await this.dictationRepository.findOneOrFail({
      id: lessonId,
    });

    console.log({ languageCode, translated_values, lesson });

    lesson.translated_languages[languageCode] = translated_values;
    this.em.flush();

    return { message: 'add new language translation successfully' };
  }

  async saveProgress(userId: any, lessonId: any, sentenceNumber: number) {
    try {
      const progress = await this.lessonProgressRepository.findOne({
        user: userId,
        dictation_lesson: lessonId,
      });

      if (!progress) {
        console.log('new progress');
        const newProgress = new LessonProgress();
        newProgress.current_sentence = sentenceNumber;
        newProgress.repeated = 0;
        newProgress.user = userId;
        newProgress.dictation_lesson = lessonId;

        await this.em.persistAndFlush(newProgress);
        return newProgress;
      }

      progress.current_sentence = sentenceNumber;
      this.em.flush();
      return progress;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getSentence(lessonId: number, key: string) {
    try {
      const sentence = await this.lessonSentenceRepository.findOneOrFail(
        {
          dictation_lesson: lessonId,
          audio: { key: key },
        },
        {
          populate: ['comments', 'audio', 'comments', 'comments.user'],
          // fields: ['audio.id'],
        }
      );
      return sentence;
    } catch (error) {
      console.log('error', error);
    }
  }
}
