import { Router } from "express";
import authRouter from "./auth/auth.router";
import classroomRouter from "./classroom/classroom.router";
import userRouter from "./user/user.router";

const router = Router();

router.use('/', authRouter);        // /register, /login
router.use('/classrooms', classroomRouter);
router.use('/users', userRouter);

export default router;