import { ClassroomModel } from "./classroom.model";
import { Role } from "../../utils/user.role.auth";
import { User } from "../user/user.entity";

async function create(name: string, students: string[], createdBy: string) {
  const classroom = await ClassroomModel.create({ name, students, createdBy });
  await classroom.populate('createdBy');
  return classroom.toJSON();
}

async function list(user: User) {

  const filter = user.role === Role.Teacher
    ? { createdBy: user.id }
    : { students: user.id };

  const classrooms = await ClassroomModel.find(filter);
  return classrooms.map(c => c.toJSON());
}

export default { create, list };