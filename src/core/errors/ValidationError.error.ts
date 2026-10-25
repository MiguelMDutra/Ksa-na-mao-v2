import { ValidationError } from "sequelize";
import { Response } from "express";

class ValidationErrorClass {
  private messages;

  constructor(error: ValidationError) {
    this.messages = error.errors.map((err) => ({
      field: err.path,
      message: err.message,
    }));
  }

  response(res: Response): void {
    res.status(400).json({
      message: this.messages,
    });
  }
}

export default ValidationErrorClass;
