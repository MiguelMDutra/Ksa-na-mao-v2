import express, { Request, Response } from "express";
import PantryIngredientController from "../Controllers/pantryIngredient/PantryIngredient.controller";
import verify from "@src/core/jwt/verifyToken";

const R = express.Router();
const pantryIngredientController = new PantryIngredientController();

R.post("/pantry/:pantryId/ingredients", verify, (req: Request, res: Response) =>
  pantryIngredientController.create(req, res),
);

R.patch(
  "/pantry/:pantryId/ingredient/:ingredientId",
  verify,
  (req: Request, res: Response) => pantryIngredientController.update(req, res),
);

export default R;
