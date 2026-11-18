import verify from "@src/core/jwt/verifyToken";
import UnitController from "../controllers/units/Unit.Controller";
import express, { NextFunction, Request, Response } from "express";
const unitController = new UnitController();
const R = express.Router();

R.get("/units", verify, (req: Request, res: Response, next: NextFunction) =>
  unitController.getUnits(req, res, next),
);

export default R;
