import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { CreateAssignmentDto } from "./assignment.dto";
import assignmentSrv from "./assignment.service";
import { User } from "../user/user.entity";

type ClassroomParams = { classroomId: string };
type AssignmentParams = { classroomId: string; id: string };

export const createAssignment = async (
  req: TypedRequest<CreateAssignmentDto, unknown, ClassroomParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const { classroomId } = req.params;
    const { title } = req.body;
    const assignment = await assignmentSrv.create(classroomId, title, user);
    res.status(201);
    res.json(assignment);
  } catch (err) {
    next(err);
  }
};

export const listAssignments = async (
  req: TypedRequest<unknown, unknown, ClassroomParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const { classroomId } = req.params;
    const assignments = await assignmentSrv.list(classroomId, user);
    res.json(assignments);
  } catch (err) {
    next(err);
  }
};

export const completeAssignment = async (
  req: TypedRequest<unknown, unknown, AssignmentParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as User;
    const { classroomId, id } = req.params;
    const assignment = await assignmentSrv.complete(classroomId, id, user);
    res.json(assignment);
  } catch (err) {
    next(err);
  }
};