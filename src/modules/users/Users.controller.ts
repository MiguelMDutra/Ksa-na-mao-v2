import { NextFunction, Request, Response } from "express";
import SignUp from "./useCases/userAuth/SignUp";
import Login from "./useCases/userAuth/Login";
import UpdateAccount from "./useCases/userAccount/updateAccount";

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

  async updateBasics(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updateData = req.body;
      const user = req.user;
      const { userId } = user!;
      const response = await UpdateAccount.execute(updateData, userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
