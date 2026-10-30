import { NextFunction, Request, Response } from "express";
import AppError from "./AppError.error";
import ValidationErrorClass from "./ValidationError.error";
import { ValidationError } from "sequelize";

function ErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.status).json({ message: err.message });
  } else if (err instanceof ValidationError) {
    const v = new ValidationErrorClass(err);
    v.response(res);
  } else {
    console.log("AAAAAAAAAAAA");
    console.log(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
}

export default ErrorHandler;
