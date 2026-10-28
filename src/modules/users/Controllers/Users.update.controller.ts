import { NextFunction, Request, Response } from "express";
import UpdateAccount from "../useCases/userAccount/UpdateAccount";
import SendEmail from "../useCases/userAccount/SendEmail";
import ChangeEmailOrPasswordToken from "../useCases/userAccount/ChangeEmailOrPasswordToken";
import UpdatePassword from "../useCases/userAccount/UpdatePassword";
import DeactivateAccount from "../useCases/userAccount/DeactivateAccount";

class UserUpdate {
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

  async updatePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;
      const user = req.user;
      const { userId } = user!;
      const response = await UpdatePassword.execute(data, userId);
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

  async deactivateAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.user;
      const { userId } = user!;
      const { email } = req.body;
      const response = await DeactivateAccount.execute(email, userId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default UserUpdate;
