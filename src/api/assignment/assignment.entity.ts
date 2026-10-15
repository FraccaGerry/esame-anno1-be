import { Types } from "mongoose";

export type Completion = {
  student: Types.ObjectId;
  completedAt: Date;
}

export type Assignment = {
  id: string;
  title: string;
  classroom: Types.ObjectId;
  createdBy: Types.ObjectId;
  completedBy: Completion[];
  createdAt: Date;
}