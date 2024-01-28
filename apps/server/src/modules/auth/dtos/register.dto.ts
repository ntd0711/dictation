import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  // @IsNotEmpty()
  email: string;

  @MinLength(2)
  @MaxLength(255)
  // @IsNotEmpty()
  name: string;

  @MinLength(6)
  @MaxLength(255)
  // @IsNotEmpty()
  password: string;

  @MinLength(6)
  @MaxLength(255)
  // @IsNotEmpty()
  confirmPassword: string;
}
