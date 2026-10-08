import { Types } from "mongoose";

export type Assignment = {
  id: string;
  title: string;
  classroom: Types.ObjectId;
  createdBy: Types.ObjectId;
  completedBy: Types.ObjectId[];
  createdAt: Date;
}