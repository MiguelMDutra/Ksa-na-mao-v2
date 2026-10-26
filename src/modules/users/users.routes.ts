import express, { NextFunction, Request, Response } from "express";

import UserController from "./Users.controller";
const userController = new UserController();

const R = express.Router();

R.post("/signUp", (req: Request, res: Response, next: NextFunction) =>
  userController.signUp(req, res, next),
);
R.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return userController.login(req, res, next);
});
export default R;
