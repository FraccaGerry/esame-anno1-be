import { IsNotEmpty, IsString } from "class-validator";

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}