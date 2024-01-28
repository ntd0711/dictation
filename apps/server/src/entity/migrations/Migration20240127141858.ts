import { Migration } from '@mikro-orm/migrations';

export class Migration20240127141858 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dictation_lessons" ("id" serial primary key, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "name" varchar(255) not null, "type" int not null, "texts" jsonb not null, "translated_languages" jsonb not null);');

    this.addSql('create table "stored_files" ("id" uuid not null, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "name" text not null, "hash" text not null, "path" text not null, "key" text not null, constraint "stored_files_pkey" primary key ("id"));');
    this.addSql('alter table "stored_files" add constraint "stored_files_hash_unique" unique ("hash");');

    this.addSql('create table "lesson_sentences" ("id" serial primary key, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "dictation_lesson_id" int null, "audio_id" uuid not null);');
    this.addSql('alter table "lesson_sentences" add constraint "lesson_sentences_audio_id_unique" unique ("audio_id");');

    this.addSql('create table "users" ("id" serial primary key, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role_id" int not null, "last_login" date null, "last_active" date null, "avatar_id" uuid null);');

    this.addSql('create table "lesson_progresses" ("id" serial primary key, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "repeated" int not null, "current_sentence" int not null, "user_id" int null, "dictation_lesson_id" int null);');

    this.addSql('create table "dictation_lessons_users" ("dictation_lesson_id" int not null, "user_id" int not null, constraint "dictation_lessons_users_pkey" primary key ("dictation_lesson_id", "user_id"));');

    this.addSql('create table "comments" ("id" serial primary key, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "content" varchar(255) not null, "reaction_count" jsonb null, "is_hidden" boolean not null default false, "user_id" int not null, "parent_id" int null, "lesson_sentence_id" int null);');

    this.addSql('create table "user_settings" ("id" serial primary key, "created_by" int null, "updated_by" int null, "created_at" timestamptz not null default \'now()\', "updated_at" timestamptz not null default \'now()\', "deleted_at" varchar(255) null, "translation_language_code" varchar(255) null, "should_show_full_correction" boolean not null default true, "nb_auto_replay" int not null default 0, "user_id" int not null);');
    this.addSql('alter table "user_settings" add constraint "user_settings_user_id_unique" unique ("user_id");');

    this.addSql('alter table "lesson_sentences" add constraint "lesson_sentences_dictation_lesson_id_foreign" foreign key ("dictation_lesson_id") references "dictation_lessons" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "lesson_sentences" add constraint "lesson_sentences_audio_id_foreign" foreign key ("audio_id") references "stored_files" ("id") on update cascade;');

    this.addSql('alter table "users" add constraint "users_avatar_id_foreign" foreign key ("avatar_id") references "stored_files" ("id") on update cascade on delete set null;');

    this.addSql('alter table "lesson_progresses" add constraint "lesson_progresses_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "lesson_progresses" add constraint "lesson_progresses_dictation_lesson_id_foreign" foreign key ("dictation_lesson_id") references "dictation_lessons" ("id") on update cascade on delete set null;');

    this.addSql('alter table "dictation_lessons_users" add constraint "dictation_lessons_users_dictation_lesson_id_foreign" foreign key ("dictation_lesson_id") references "dictation_lessons" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "dictation_lessons_users" add constraint "dictation_lessons_users_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "comments" add constraint "comments_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "comments" add constraint "comments_parent_id_foreign" foreign key ("parent_id") references "comments" ("id") on update cascade on delete set null;');
    this.addSql('alter table "comments" add constraint "comments_lesson_sentence_id_foreign" foreign key ("lesson_sentence_id") references "lesson_sentences" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_settings" add constraint "user_settings_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "lesson_sentences" drop constraint "lesson_sentences_dictation_lesson_id_foreign";');

    this.addSql('alter table "lesson_progresses" drop constraint "lesson_progresses_dictation_lesson_id_foreign";');

    this.addSql('alter table "dictation_lessons_users" drop constraint "dictation_lessons_users_dictation_lesson_id_foreign";');

    this.addSql('alter table "lesson_sentences" drop constraint "lesson_sentences_audio_id_foreign";');

    this.addSql('alter table "users" drop constraint "users_avatar_id_foreign";');

    this.addSql('alter table "comments" drop constraint "comments_lesson_sentence_id_foreign";');

    this.addSql('alter table "lesson_progresses" drop constraint "lesson_progresses_user_id_foreign";');

    this.addSql('alter table "dictation_lessons_users" drop constraint "dictation_lessons_users_user_id_foreign";');

    this.addSql('alter table "comments" drop constraint "comments_user_id_foreign";');

    this.addSql('alter table "user_settings" drop constraint "user_settings_user_id_foreign";');

    this.addSql('alter table "comments" drop constraint "comments_parent_id_foreign";');

    this.addSql('drop table if exists "dictation_lessons" cascade;');

    this.addSql('drop table if exists "stored_files" cascade;');

    this.addSql('drop table if exists "lesson_sentences" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "lesson_progresses" cascade;');

    this.addSql('drop table if exists "dictation_lessons_users" cascade;');

    this.addSql('drop table if exists "comments" cascade;');

    this.addSql('drop table if exists "user_settings" cascade;');
  }

}
