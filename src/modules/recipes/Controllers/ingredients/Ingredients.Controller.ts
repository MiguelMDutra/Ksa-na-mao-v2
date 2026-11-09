import { NextFunction, Request, Response } from "express";
import CreateIngredient from "../../useCases/ingredients/CreateIngredient";
import UpdateIngredient from "../../useCases/ingredients/UpdateIngredient";
const ci = new CreateIngredient();
const up = new UpdateIngredient();

class IngredientController {
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
      res.status(200).json(ingredient);
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
