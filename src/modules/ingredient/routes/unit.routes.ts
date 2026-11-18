import verify from "@src/core/jwt/verifyToken";
import UnitController from "../controllers/units/Unit.Controller";
import express, { NextFunction, Request, Response } from "express";
import { verifyAdmin } from "@src/core/jwt/verifyAdmin";
const unitController = new UnitController();
const R = express.Router();

R.get("/units", verify, (req: Request, res: Response, next: NextFunction) =>
  unitController.getUnits(req, res, next),
);

R.post(
  "/units",
  verify,
  verifyAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    unitController.createUnit(req, res, next),
);

R.put(
  "/units/:unitId",
  verify,
  verifyAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    unitController.updateUnit(req, res, next),
);

export default R;
