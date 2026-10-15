import { IsEmail, IsEnum, IsString, IsUrl, Matches } from "class-validator";
import { Role } from "../../utils/user.role.auth";

export class RegisterDto {
  @IsEmail()
  username: string;

  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$'),
    {
      message: 'password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.'
    }
  )
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Role)
  role: Role;

  @IsUrl()
  picture: string;
}

export class LoginDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
