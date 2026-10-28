import { NextFunction, Request, Response } from "express";
import SignUp from "../useCases/userAuth/SignUp";
import Login from "../useCases/userAuth/Login";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const signUpData = req.body;
      const token = await SignUp.execute(signUpData);
      res.status(201).json({ token: token });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData = req.body;
      const token = await Login.execute(loginData);
      res.status(200).json({ token: token });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
