import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsString()
  @IsOptional()
  translation_language_code: string;

  @IsBoolean()
  @IsOptional()
  should_show_full_correction: boolean;

  @IsNumber()
  @IsOptional()
  nb_auto_replay: number;
}
