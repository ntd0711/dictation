import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from '@server/modules/user/user.service';
import { RequestUser } from '@server/modules/dictation/dictation.controller';
import { UpdateSettingDto } from '@server/modules/user/dtos/updateSetting.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('setting/update')
  updateUserSetting(
    @Req() req: RequestUser,
    @Body() updateSettingDto: UpdateSettingDto
  ) {
    // return { userId: req.user.id };
    return this.userService.updateUserSetting(req.user.id, updateSettingDto);
  }
}
