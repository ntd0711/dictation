import { DictationLessonType } from '@server/constant/DictationLessonType';
import { AudioFile } from '@server/modules/upload/upload.service';
import {
  IsArray,
  IsEnum,
  IsObject,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateLessonDto {
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsEnum(DictationLessonType)
  type: number;

  @IsObject()
  texts: object;

  @IsObject()
  translated_file: { languageCode: string; values: object };

  @IsObject()
  audio: AudioFile[];
}
