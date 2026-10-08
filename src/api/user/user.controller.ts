import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { ListUsersQueryDto } from "./user.dto";
import userSrv from "./user.service";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
}

export const listUsers = async (
  req: TypedRequest<unknown, ListUsersQueryDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.query;
    const users = await userSrv.list(type);
    res.json(users);
  } catch (err) {
    next(err);
  }
};