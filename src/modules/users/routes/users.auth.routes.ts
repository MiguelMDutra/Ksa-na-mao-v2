import express, { NextFunction, Request, Response } from "express";

import UserAuth from "../Controllers/Users.auth.controller";
const userAuth = new UserAuth();

const R = express.Router();

R.post("/signUp", (req: Request, res: Response, next: NextFunction) =>
  userAuth.signUp(req, res, next),
);
R.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return userAuth.login(req, res, next);
});

export default R;
