import { NextFunction, Request, Response } from "express";
import Forbidden from "../errors/Forbidden.error";

export function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.user?.role === "admin") next();
  else throw new Forbidden("Você não tem a permissão necessária.");
}
