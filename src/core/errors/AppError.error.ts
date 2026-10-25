import { Response } from "express";

class AppError extends Error {
  status: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status || 500;
  }

  response(res: Response): void {
    res.status(this.status).json({ message: this.message });
  }
}

export default AppError;
