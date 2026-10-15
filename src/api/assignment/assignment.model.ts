import { model, Schema } from "mongoose";
import { Assignment, Completion } from "./assignment.entity";

const completionSchema = new Schema<Completion>({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completedAt: { type: Date, required: true }
}, { _id: false });

const assignmentSchema = new Schema<Assignment>({
  title: { type: String, required: true },
  classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completedBy: [completionSchema],
  createdAt: { type: Date, default: Date.now }
});


assignmentSchema.virtual('studentsCount').get(function () {
  return (this.classroom as any)?.students?.length ?? 0;
});

assignmentSchema.virtual('completedCount').get(function () {
  return this.completedBy?.length ?? 0;
});

assignmentSchema.pre(['find', 'findOne'], function () {
  this.populate('createdBy');
  this.populate({ path: 'classroom', select: 'students' });
});

assignmentSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    delete ret.classroom;
    delete ret.completedBy;
    return ret;
  }
});

export const AssignmentModel = model<Assignment>('Assignment', assignmentSchema);