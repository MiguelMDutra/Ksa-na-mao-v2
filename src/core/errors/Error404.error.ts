import { Request, Response, NextFunction } from "express";
import NotFound from "./NotFound.error";
const notFound = new NotFound("Página não encontrada");

export function Error404(
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction,
): void {
  res.status(404).json({ message: notFound.message });
}
