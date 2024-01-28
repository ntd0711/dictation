import { Module } from '@nestjs/common';

// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from '@server/modules/app/app.service';
import { AppAuthGuard } from '@server/modules/auth/auth.guard';
import { AuthModule } from '@server/modules/auth/auth.module';
import { AppController } from '@server/modules/app/app.controller';
import { MikroOrmModule } from '@server/modules/mikro-orm/mikro-orm.module';
import { DictationModule } from '@server/modules/dictation/dictation.module';
import { CommentModule } from '@server/modules/comment/comment.module';
import { UserModule } from '@server/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MikroOrmModule,
    DictationModule,
    CommentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class AppModule {}
