import { Types } from "mongoose";
import { AssignmentModel } from "./assignment.model";
import { ClassroomModel } from "../classroom/classroom.model";
import { Role } from "../../utils/user.role.auth";
import { User } from "../user/user.entity";
import { NotFoundError } from "../../errors/not-found.error";
import { AlreadyCompletedError } from "../../errors/already-completed.error";

function assertValidId(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new NotFoundError();
}

async function findClassroomForTeacher(classroomId: string, teacherId: string) {
  assertValidId(classroomId);
  const classroom = await ClassroomModel.findOne({ _id: classroomId, createdBy: teacherId });
  if (!classroom) throw new NotFoundError();
  return classroom;
}

async function findClassroomForStudent(classroomId: string, studentId: string) {
  assertValidId(classroomId);
  const classroom = await ClassroomModel.findOne({ _id: classroomId, students: studentId });
  if (!classroom) throw new NotFoundError();
  return classroom;
}

function serialize(assignment: any, user: User) {
  const json = assignment.toJSON();
  if (user.role === Role.Student) {
    json.completed = assignment.completedBy
      .some((c: any) => c.student.toString() === user.id);
  }
  return json;
}

async function create(classroomId: string, title: string, teacher: User) {
  await findClassroomForTeacher(classroomId, teacher.id);

  const assignment = await AssignmentModel.create({
    title,
    classroom: classroomId,
    createdBy: teacher.id,
    completedBy: []
  });

  const populated = await AssignmentModel.findById(assignment.id);
  return serialize(populated, teacher);
}

async function list(classroomId: string, user: User) {
  if (user.role === Role.Teacher) {
    await findClassroomForTeacher(classroomId, user.id);
  } else {
    await findClassroomForStudent(classroomId, user.id);
  }

  const assignments = await AssignmentModel.find({ classroom: classroomId });
  return assignments.map(a => serialize(a, user));
}

async function complete(classroomId: string, assignmentId: string, student: User) {
  await findClassroomForStudent(classroomId, student.id);

  assertValidId(assignmentId);
  const assignment = await AssignmentModel.findOne({ _id: assignmentId, classroom: classroomId });
  if (!assignment) throw new NotFoundError();

  const alreadyCompleted = assignment.completedBy
    .some(c => c.student.toString() === student.id);

  if (alreadyCompleted) throw new AlreadyCompletedError();

  assignment.completedBy.push({
    student: new Types.ObjectId(student.id),
    completedAt: new Date()
  });
  await assignment.save();

  const populated = await AssignmentModel.findById(assignment.id);
  return serialize(populated, student);
}

async function listStudents(classroomId: string, assignmentId: string, teacher: User) {
  const classroom = await findClassroomForTeacher(classroomId, teacher.id);

  assertValidId(assignmentId);
  const assignment = await AssignmentModel.findOne({ _id: assignmentId, classroom: classroomId });
  if (!assignment) throw new NotFoundError();

  await classroom.populate('students');

  const completedAtByStudent = new Map(
    assignment.completedBy.map(c => [c.student.toString(), c.completedAt] as const)
  );

  return (classroom.students as any[]).map(student => {
    const completedAt = completedAtByStudent.get(student.id);
    return {
      student: student.toJSON(),
      completed: completedAt !== undefined,
      completedAt: completedAt ?? null
    };
  });
}

export default { create, list, complete, listStudents };