import express, { NextFunction, Request, Response } from "express";
import PantryController from "../Controllers/Pantry.controller";
import verify from "@src/core/jwt/verifyToken";

const R = express.Router();
const pantryController = new PantryController();

R.post("/pantry", verify, (req: Request, res: Response, next: NextFunction) =>
  pantryController.create(req, res, next),
);

R.delete("/pantry/:id", verify, (req: Request, res: Response) =>
  pantryController.delete(req, res),
);

R.get("/pantry", verify, (req: Request, res: Response) =>
  pantryController.getMyPantries(req, res),
);

R.get("/pantry/:pantryId", verify, (req: Request, res: Response) =>
  pantryController.getPantryInfos(req, res),
);

R.patch("/pantry/:id", verify, (req: Request, res: Response) =>
  pantryController.update(req, res),
);

export default R;
