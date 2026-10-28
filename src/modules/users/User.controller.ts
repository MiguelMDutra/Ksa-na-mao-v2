import { NextFunction, Request, Response } from "express";
import SignUp from "./useCases/userAuth/SignUp";
import Login from "./useCases/userAuth/Login";
import UpdateAccount from "./useCases/userAccount/UpdateAccount";
import SendEmail from "./useCases/userAccount/SendEmail";
import ChangeEmailOrPasswordToken from "./useCases/userAccount/ChangeEmailOrPasswordToken";

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

  async updateEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.sendEmail(req, res, next, "updateEmail");
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.sendEmail(req, res, next, "forgotPassword");
  }

  async sendEmail(
    req: Request,
    res: Response,
    next: NextFunction,
    type: string,
  ): Promise<void> {
    try {
      const user = req.user;
      const { userId } = user!;
      const response = await SendEmail.execute(userId, type);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async changeThroughToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user;
      const { userId } = user!;
      const newData = req.body;
      const { token } = req.params;
      const tokenString = token as string;
      const response = await ChangeEmailOrPasswordToken.execute(
        userId,
        newData,
        tokenString,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
