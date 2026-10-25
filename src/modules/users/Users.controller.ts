import { NextFunction, Request, Response } from "express";
import SignUp from "./useCases/SignUp";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const signUpData = req.body;
      const token = await SignUp.execute(signUpData);
      if (token) res.status(201).json({ token: token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
