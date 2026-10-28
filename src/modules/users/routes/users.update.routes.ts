import express, { NextFunction, Request, Response } from "express";

import UserUpdate from "../Controllers/Users.update.controller";
import verify from "@src/core/jwt/verifyToken";
const userUpdate = new UserUpdate();

const R = express.Router();

R.patch(
  "/patch-basics",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userUpdate.updateBasics(req, res, next);
  },
);

R.patch(
  "/patch-password",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userUpdate.updatePassword(req, res, next);
  },
);

R.post(
  "/update-email",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userUpdate.updateEmail(req, res, next);
  },
);

R.post(
  "/forgot-password",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userUpdate.forgotPassword(req, res, next);
  },
);

R.patch(
  "/change-with-token/:token",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userUpdate.changeThroughToken(req, res, next);
  },
);

R.delete(
  "/deactivate-account",
  verify,
  (req: Request, res: Response, next: NextFunction) => {
    userUpdate.deactivateAccount(req, res, next);
  },
);

export default R;
