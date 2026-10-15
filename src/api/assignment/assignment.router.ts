import { Router } from "express";
import passport from "passport";
import { validate } from "../../utils/validation-middleware";
import { CreateAssignmentDto } from "./assignment.dto";
import { createAssignment, listAssignments, completeAssignment, listAssignmentStudents } from "./assignment.controller";
import { requireRole } from "../../utils/auth/require-role";
import { Role } from "../../utils/user.role.auth";

const router = Router({ mergeParams: true });

router.post(
  '/assignments',
  passport.authenticate('jwt', { session: false }),
  requireRole(Role.Teacher),
  validate(CreateAssignmentDto, 'body'),
  createAssignment
);

router.get(
  '/assignments',
  passport.authenticate('jwt', { session: false }),
  listAssignments
);

router.patch(
  '/assignments/:id',
  passport.authenticate('jwt', { session: false }),
  requireRole(Role.Student),
  completeAssignment
);

router.get(
  '/assignments/:id/students',
  passport.authenticate('jwt', { session: false }),
  requireRole(Role.Teacher),
  listAssignmentStudents
);

export default router;