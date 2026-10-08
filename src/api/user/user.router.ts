import { Router } from "express";
import { me, listUsers } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation-middleware";
import { ListUsersQueryDto } from "./user.dto";

const router = Router();

router.get('/me', isAuthenticated, me);
router.get('/', isAuthenticated, validate(ListUsersQueryDto, 'query'), listUsers);

export default router;