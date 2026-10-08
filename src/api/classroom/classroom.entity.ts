import { Types } from "mongoose";

export type Classroom = {
  id: string;
  name: string;
  students: Types.ObjectId[];
  studentsCount: number;
  createdBy: Types.ObjectId;
}