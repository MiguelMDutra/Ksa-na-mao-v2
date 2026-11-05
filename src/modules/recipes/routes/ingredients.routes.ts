import verify from "@src/core/jwt/verifyToken";
import IngredientController from "../Controllers/ingredients/Ingredients.Controller";
import express, { NextFunction, Request, Response } from "express";
const ingredientController = new IngredientController();
const R = express.Router();

R.post(
  "/ingredient",
  verify,
  (req: Request, res: Response, next: NextFunction) =>
    ingredientController.createIngredient(req, res, next),
);

R.patch(
  "/ingredient/:id",
  verify,
  (req: Request, res: Response, next: NextFunction) =>
    ingredientController.updateIngredient(req, res, next),
);

export default R;
