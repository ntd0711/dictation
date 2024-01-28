import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '@server/entity/entities/User';
import { UserSetting } from '@server/entity/entities/UserSetting';
import { UserController } from '@server/modules/user/user.controller';
import { UserService } from '@server/modules/user/user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserSetting])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
