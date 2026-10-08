import { model, Schema } from "mongoose";
import { Classroom } from "./classroom.entity";

const classroomSchema = new Schema<Classroom>({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

classroomSchema.virtual('studentsCount').get(function () {
  return this.students?.length ?? 0;
});

classroomSchema.pre(['find', 'findOne'], function () {
  this.populate('createdBy');
});

classroomSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    delete ret.students;
    return ret;
  }
});

classroomSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const ClassroomModel = model<Classroom>('Classroom', classroomSchema);