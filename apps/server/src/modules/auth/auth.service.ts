import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@server/entity/entities/User';
import { LoginDto } from '@server/modules/auth/dtos/login.dto';
import { RegisterDto } from '@server/modules/auth/dtos/register.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UploadService } from '@server/modules/upload/upload.service';
import { scrypt, randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { UserSetting } from '@server/entity/entities/UserSetting';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private em: EntityManager,
    private readonly uploadService: UploadService,
    private jwtService: JwtService
  ) {}

  async login(payload: LoginDto) {
    let user = await this.userRepository.findOne({ email: payload.email });
    if (!user) {
      throw new HttpException('Information invalid', HttpStatus.BAD_REQUEST);
    }
    const matchPassword = this.validatePassword(
      payload.password,
      user.password
    );
    if (!matchPassword) {
      throw new UnauthorizedException();
    }
    const access_token = await this.jwtService.signAsync({
      id: user.id,
    });
    return { access_token };
  }

  async register(payload: RegisterDto) {
    let user = await this.userRepository.findOne({ email: payload.email });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    if (payload.confirmPassword !== payload.password) {
      throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    }
    try {
      const userSetting = new UserSetting();
      const user = new User();
      user.name = payload['name'];
      user.email = payload['email'];
      user.password = await this.getHash(payload['password']);
      user.role_id = 2;
      user.setting = userSetting;

      await this.em.persistAndFlush([user, userSetting]);
      return user;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getHash(plainText) {
    const salt = randomBytes(16).toString('hex');
    const buf = (await scryptAsync(plainText, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`;
  }

  async validatePassword(password, hash) {
    const [hashedPassword, salt] = hash.split('.');
    const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
    const suppliedPasswordBuf = (await scryptAsync(
      password,
      salt,
      64
    )) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }

  async getLoggerUser(id: User['id']) {
    const user = await this.userRepository.findOneOrFail(
      { id },
      { populate: ['avatar'] }
    );
    return user;
  }
}
