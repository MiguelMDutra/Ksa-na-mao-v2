import express, { NextFunction, Request, Response } from "express";

import UserController from "./User.controller";
const userController = new UserController();
import verify from "@src/core/jwt/verifyToken";

const R = express.Router();

R.post("/signUp", (req: Request, res: Response, next: NextFunction) =>
  userController.signUp(req, res, next),
);
R.post("/login", (req: Request, res: Response, next: NextFunction) => {
  userController.login(req, res, next);
});
R.patch(
  "/patch-basics",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userController.updateBasics(req, res, next);
  },
  R.get(
    "/update-email",
    verify,
    (req: Request, res: Response, next: NextFunction) => {
      userController.updateEmail(req, res, next);
    },
  ),
  R.get(
    "/forgot-password",
    verify,
    (req: Request, res: Response, next: NextFunction) => {
      userController.forgotPassword(req, res, next);
    },
  ),
  R.patch(
    "/change-with-token/:token",
    verify,
    (req: Request, res: Response, next: NextFunction) => {
      userController.changeThroughToken(req, res, next);
    },
  ),
);

export default R;
