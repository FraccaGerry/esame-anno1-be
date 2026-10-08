import { IsEnum } from "class-validator";
import { Role } from "../../utils/user.role.auth";

export class ListUsersQueryDto {
  @IsEnum(Role)
  type: Role;
}