import { NextFunction, Request, Response } from "express";
import GetMyIngredients from "../../ingredient/useCases/ingredients/GetMyIngredients";
import GetAllIngredients from "../../ingredient/useCases/ingredients/GetAllIngredients";
import CreateIngredient from "../../ingredient/useCases/ingredients/CreateIngredient";
import UpdateIngredient from "../../ingredient/useCases/ingredients/UpdateIngredient";
const gmi = new GetMyIngredients();
const gai = new GetAllIngredients();
const ci = new CreateIngredient();
const up = new UpdateIngredient();

class IngredientController {
  async getMyIngredients(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { offsetQuery, limitQuery } = req.query;

      const limit =
        limitQuery !== undefined &&
        isFinite(Number(limitQuery)) &&
        Number(limitQuery) > 0
          ? Number(limitQuery)
          : 20;

      const offset =
        offsetQuery !== undefined &&
        isFinite(Number(offsetQuery)) &&
        Number(offsetQuery) >= 0
          ? Number(offsetQuery)
          : 0;

      const ingredient = await gmi.execute({ offset, limit }, userId);
      res.status(200).json(ingredient);
    } catch (error) {
      next(error);
    }
  }

  async getAllIngredients(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const { offsetQuery, limitQuery } = req.query;

      const limit =
        limitQuery !== undefined &&
        isFinite(Number(limitQuery)) &&
        Number(limitQuery) > 0
          ? Number(limitQuery)
          : 20;

      const offset =
        offsetQuery !== undefined &&
        isFinite(Number(offsetQuery)) &&
        Number(offsetQuery) >= 0
          ? Number(offsetQuery)
          : 0;

      const ingredient = await gai.execute({ offset, limit }, userId);
      res.status(200).json(ingredient);
    } catch (error) {
      next(error);
    }
  }

  async createIngredient(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.userId;
      const bodyData = req.body;
      const data = {
        userId,
        ...bodyData,
      };
      const ingredient = await ci.execute(data);
      res.status(201).json(ingredient);
    } catch (error) {
      next(error);
    }
  }

  async updateIngredient(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.user!;
      const { id } = req.params;
      const data = req.body;
      const ingredient = await up.execute(data, Number(id), userId);
      res.status(200).json(ingredient);
    } catch (error) {
      next(error);
    }
  }
}

export default IngredientController;
