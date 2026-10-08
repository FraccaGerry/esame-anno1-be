import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { CreateClassroomDto } from "./classroom.dto";
import classroomSrv from "./classroom.service";
import { User } from "../user/user.entity";

export const createClassroom = async (
  req: TypedRequest<CreateClassroomDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const { name, students } = req.body;
    const classroom = await classroomSrv.create(name, students, user.id);
    res.status(201);
    res.json(classroom);
  } catch (err) {
    next(err);
  }
};

export const listClassrooms = async (
  req: TypedRequest<unknown>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const classrooms = await classroomSrv.list(user);
    res.json(classrooms);
  } catch (err) {
    next(err);
  }
};