import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '@server/entity/entities/User';
import { UserSetting } from '@server/entity/entities/UserSetting';
import { UpdateSettingDto } from '@server/modules/user/dtos/updateSetting.dto';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: EntityRepository<UserSetting>
  ) {}

  async updateUserSetting(userId: number, payload: UpdateSettingDto) {
    try {
      let setting = await this.userSettingRepository.findOneOrFail({
        user: userId,
      });
      for (const property in payload) {
        const value = payload[property];
        setting[property] = value;
      }

      await this.em.flush();
      return { message: 'update successfully' };
    } catch (error) {
      console.log('error', error);
    }
  }
}
