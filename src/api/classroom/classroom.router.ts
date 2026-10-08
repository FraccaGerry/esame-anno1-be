import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation-middleware";
import { CreateClassroomDto } from "./classroom.dto";
import { createClassroom, listClassrooms } from "./classroom.controller";
import { requireRole } from "../../utils/auth/require-role";
import { Role } from "../../utils/user.role.auth";
import assignmentRouter from "../assignment/assignment.router";

const router = Router({ mergeParams: true });

router.post(
  '/',
  isAuthenticated,
  requireRole(Role.Teacher),
  validate(CreateClassroomDto, 'body'),
  createClassroom
);

router.get(
  '/',
  isAuthenticated,
  listClassrooms
);

router.use('/:classroomId', assignmentRouter);

export default router;