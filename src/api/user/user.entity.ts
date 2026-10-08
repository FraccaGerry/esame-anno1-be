import { Role } from "../../utils/user.role.auth";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  fullName: string;
  picture: string;
}
