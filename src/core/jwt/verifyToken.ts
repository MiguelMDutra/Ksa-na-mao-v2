import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Unauthorized from "../errors/Unauthorized.error";

import models from "@src/database/models";
import Forbidden from "../errors/Forbidden.error";
import { AuthUser } from "../types/authUser.types";
const userModel = models.user;

export async function verify(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    throw new Unauthorized("Você está sem um token de sessão.");
  const token = header.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JSONKEY!) as AuthUser;

    req.user = user;
    const active = await userModel.findOne({
      where: { userId: req.user.userId },
    });
    if (active) next();
    else throw new Forbidden("Sua conta está desativada.");
  } catch (error) {
    next(error);
  }
}

export default verify;
